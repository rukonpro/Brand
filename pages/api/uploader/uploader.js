import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { paramsToSign } = req.body;

            // Generate the signature
            const signature = cloudinary.utils.api_sign_request(
                paramsToSign,
                process.env.CLOUDINARY_API_SECRET
            );

            // Send back the signature as a response
            res.status(200).json({ signature });
        } catch (error) {
            // Handle errors
            res.status(500).json({
                error: "Failed to generate signature",
                details: error.message,
            });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
