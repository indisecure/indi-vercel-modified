const mongoose = require('mongoose')
const carSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
}, {
    timestamps: true

}
)
const Car = mongoose.model('maruti', carSchema)
module.exports = Car
