const express = require("express")
const auth = require("../utils/auth")

const {userSignUp, getUsers, getSingleUser,  userSignIn, userUpdate, deleteUser} = require("../controller/authController")

const router = express.Router()

router
    .route("/")
    .post(userSignUp)
    .get(getUsers)

router.route('/signIn').post(userSignIn);
router.route('/update').patch(auth, userUpdate);

router
    .route("/:id")
    .get(getSingleUser)
    .delete(deleteUser)

module.exports = router