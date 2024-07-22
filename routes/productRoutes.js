const express = require("express")

// controller

const {getProducts, createProduct, getProductById, deleteProduct, updateProduct} = require("../controller/productController")

const router = express.Router()

router
    .route("/")
    .get(getProducts)
    .post(createProduct)

router
    .route("/:id")
    .get(getProductById)
    .delete(deleteProduct)
    .put(updateProduct)

module.exports = router