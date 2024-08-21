const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

const productRoutes = require("./routes/productRoutes")
const userRoute = require("./routes/userRoute")
const specificationRoute = require("./routes/specificationRoute")

const app = express()

app.use(express.json())

app.use("/api/product", productRoutes)
app.use("/api/user", userRoute)
app.use("/api/specification", specificationRoute)

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
})