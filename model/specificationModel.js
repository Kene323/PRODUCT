const mongoose = require("mongoose")

const specificationSchema = new mongoose.Schema({
    value:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    height:{
        type: Number,
        required: true
    },
    weight:{
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
})

const Specification = mongoose.model("Specification", specificationSchema)
module.exports = Specification