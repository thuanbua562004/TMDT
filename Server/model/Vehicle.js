const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    colorCode: { type: String, required: true },
    imageUrl: { type: String, required: true } 
});

const vehicleSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toHexString()
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: [],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    colors: [colorSchema], 
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
