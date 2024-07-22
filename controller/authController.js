const bcryptjs = require("bcryptjs")
const User = require("../model/userModel")

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

module.exports = {userSignUp, getUsers, getSingleUser}