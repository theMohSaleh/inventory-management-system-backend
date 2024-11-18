const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Classroom Materials', 'Art Supplies', 'Sports Equipment', 'Music Instruments', 'Library Resources', 'Office Supplies'],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;