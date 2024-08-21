const Specification = require("../model/specificationModel")
const productModel = require("../model/productModel")
const mongoose = require("mongoose")

// create Specification
const createSpecification = async (req, res)=>{
        try{
            const {value, color, height, weight} = req.body
            const product = await productModel.findById(req.params.productId)
            if(!product) return res.status(404).json({message: "Product does not exist"})
            const create = new Specification({
                value,
                color,
                height,
                weight
            })

            create.product = product._id
            create.save()

            product.specifications?.push(new mongoose.Types.ObjectId(create._id))
            product.save()

            res.status(201).json({
                success: true,
                result: create
            })
        }catch(err){
            res.status(500).json({
                success: false,
                error: err.message
            })
            console.log(err)
        }
}

// get all Specifications

const getSpecifications = async (req, res)=>{
    try{
    const specificationCall = await Specification.find()
    res.status(200).json({
        success: true,
        data: specificationCall
    })
}catch(err){
    res.status(500).json({
        success: false,
        message: err.message
    })
}
}

// get specification by Id
const getSingleSpecification = async (req, res)=>{
    try{
        const specification = await Specification.findById(req.params.productId)
        if(Specification){
            res.status(200).json({
                success: true,
                result: Specification
            })
        }else{
            res.status(404).json({
                success: false,
                error: err.message
            })
        }
    }catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

// delete a specification
const deleteSpecification = async(req, res)=>{
    try{
        const delSpec = await Specification.findByIdAndDelete(req.params.productId)
        if(!delSpec){
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }else{
            res.status(200).json({
                success: true,
                message: "Specification deleted successfully"
            })
        }
    }catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

const updateSpecification = async (req, res)=>{
    const {specification} = req.body
    try{
        const updateSpecification = await Specification.findByIdAndUpdate(req.params.productId, {
            $set: {
                specification
            }
        }, {new: true, runValidators: true}
    )

    if(updateSpecification){
        res.status(200).json({
            success: true,
            message: updateSpecification
        })
    }else{
        res.status(404).json({
            success: false,
            message: "Specification not Found"
        })
    }
    }catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

module.exports = {createSpecification, getSpecifications, getSingleSpecification,deleteSpecification, updateSpecification}