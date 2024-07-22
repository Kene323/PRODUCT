const express = require("express")

const {userSignUp, getUsers, getSingleUser} = require("../controller/authController")

const router = express.Router()

router
    .route("/")
    .post(userSignUp)
    .get(getUsers)

router
    .route("/:id")
    .get(getSingleUser)
    
module.exports = router