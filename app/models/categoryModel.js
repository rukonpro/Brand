// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    photo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
    timeseries: true
});


const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;