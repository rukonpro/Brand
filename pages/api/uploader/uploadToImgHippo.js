
import cloudinary from 'cloudinary';


// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dtncxgdrh', // your cloud name
    api_key: '812182176278293', // your API key
    api_secret: 'HzyC3URli47kgvnWg_zj8q5i0rY', // your API secret
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { fileName } = req.body; // You can pass additional parameters as needed

        // Generate the signature
        const timestamp = Math.floor(Date.now() / 1000);
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp,
                // Add any additional parameters you want to include in the signature
            },
            cloudinary.config().api_secret
        );

        res.status(200).json({ signature, timestamp });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}