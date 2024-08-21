const bcryptjs = require("bcryptjs")
const User = require("../model/userModel")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const Product = require("../model/productModel")


// register(signUp), login(signIn)

const userSignUp = async (req, res)=>{
    try{
        const {name, email, photo, password, confirmPassword} = req.body

 // checking if any field is empty
        if(!name || !email || !password){
            return res.status(500).json({
                message: "All fields must be filled appropriately"
            })
        }

// Checking that the email is used more than once i.e the email doesn't pre-exist

const checkEmail = await User.findOne({email: email})
if(checkEmail){
    return res.status(500).json({
        message: "Email already exists"
    })
}

// hashing Password
const salt = await bcryptjs.genSalt(12)
const hashPassword = await bcryptjs.hash(password, salt)

// creating Password
const newUser = await User.create({
    name, email, photo, password:hashPassword
})

newUser.save()
return res.status(201).json({
    success: true,
    message: "User signUp successful",
    data: newUser
})

}catch(err){
        res.status(404).json({
            success: false,
            message: [err.message, "1"]
        })
    }
}

// get all users
const getUsers = async (req, res)=>{
    try{
        const userCall = await User.find()
        res.status(200).json({
            success: true,
            data: userCall
        })
}catch(err){
    res.status(404).json({
        success: false,
        message: [err.message, "2"]
    })
}
}

// get a Single User
const getSingleUser = async (req, res)=>{
    try{
        const userData = await User.findById(req.params.id)
        res.status(200).json({
            success: true,
            result: userData
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: [err.message, "4"]
        })
    }
}

// signIn Users
const userSignIn = async (req, res)=>{
    try{
        const {email, password} = req.body
        const userDetails = await User.findOne({email})
        if(!userDetails){
            return res.status(404).json({
                success: true,
                message: "User does not exist"
            })
        }
            const comparePassword = await bcryptjs.compare(password, userDetails.password)
        
        if(!comparePassword) return res.status(403).json({message: "Invalid password"})         // single line if statement

            const token = await jwt.sign({_id:userDetails._id}, process.env.JWTSECRET, {expiresIn: "1d"}) // single line else statement

            res.status(200).json({
                status: "successful",
                data: token,
                message: "User login successful"
            });
    }catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
}

const userUpdate = async (req, res)=>{
    try{
        const id = req.user._id
        const user = await User.findById(id)

        const {name} = req.body
        if (!user) return res.status(404).json({message: "User doe not exist"})

            const update = await User.findByIdAndUpdate(user._id, {name}, {new: true})

            res.status(200).json({
                status: "successful",
                data: update
            })
    }catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
}

// delete user
const deleteUser = async (req, res)=>{
    try{
        const delUser = await User.findById(req.params.id)
        if(!delUser){
            res.status(404).json({
                message: "User not found"
            })
        }else{
            await User.findByIdAndDelete(delUser._id)
            res.status(200).json({
                success: true,
            message: "User deleted successfully"
            })
        }
    }catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

module.exports = {userSignUp, getUsers, getSingleUser, userSignIn, userUpdate, deleteUser}