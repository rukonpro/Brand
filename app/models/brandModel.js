import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Brand name is required'],
    },
    description: {
        type: String,
    },
    logo: {
        type: String, // URL to the brand logo
        required: true,
    },
    website: {
        type: String,
    }
}, { timestamps: true });

const Brand = mongoose.models.Brand || mongoose.model('Brand', brandSchema);

export default Brand;