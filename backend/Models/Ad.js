const mongoose = require('mongoose');
const { Schema } = mongoose;

const adSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    consumer: { type: String, required: true },
    houseAddress: { type: Number, required: true },
    demandUnits: { type: Number, required: true },
    arrangedUnits: { type: Number, default:0 },
    date: { type: String, required: true },
    pricePerUnit: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['Canceled', 'Sold', 'Live'], 
        required: true 
    }
});

module.exports = mongoose.model('Ad', adSchema);
