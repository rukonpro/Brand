// utils/imageUploader/imageUploader.js

export const uploadImages = async (files) => {
    const uploadedPhotos = [];
    for (let file of files) {
        const formData = new FormData();
        formData.append('file', file); // Append each file to FormData
        formData.append('upload_preset', 'brandrukon'); // Your Cloudinary upload preset name

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dtncxgdrh/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json(); // Parse JSON response

            if (response.ok) {
                uploadedPhotos.push(result.secure_url); // Store the secure URL in the array
            } else {
                return {
                    message: result.message,
                };
            }
        } catch (error) {
            return {
                error: error.message,
            };
        }
    }

    return {
        photos: uploadedPhotos,
    }; // Return array of uploaded image URLs
};
