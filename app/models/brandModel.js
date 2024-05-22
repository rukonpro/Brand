// models/BrandProfessional.js
import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    logo: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false,
    },
}, { timestamps: true });

export default mongoose.models.Brand || mongoose.model('Brand', BrandSchema);
