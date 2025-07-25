const mongoose = require('mongoose')
const carSchema = new mongoose.Schema({
    model: {
        type: String,
        reuired: true
    },
    color: {
        type: String,
        reuired: true
    },
    price: {
        type: Number,
        reuired: true
    },
}, {
    timestamps: true

}
)
const Car = mongoose.model('maruti', carSchema)
module.exports = Car