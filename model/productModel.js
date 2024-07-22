const { default: mongoose } = require("mongoose")

const addressSchema = new mongoose.Schema({
    state: String,
    city: String,
    street: String
})

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
    }
})

const productSchema = new mongoose.Schema({
name:{
    type: String,
    required: [true, "Name must be filled"]
},
price:{
    type: Number,
    required: true
},
category:{
    type: String,
    required: true
},
inStock:{
    type: Boolean,
    default: false,
    required: true
},
manufacturerName:{
        type: String,
        required: true
    },
    address: addressSchema,
specifications: [specificationSchema]
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product