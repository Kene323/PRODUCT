const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.log(`Error in connecting to the database ${err}`);
})

module.exports = mongoose.connection