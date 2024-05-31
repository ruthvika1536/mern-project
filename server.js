const express=require('express');
const colors=require('colors');
const moragan=require('morgan');
const dotenv=require('dotenv');
const connectDB = require('./config/db');
//dotenv config 
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app=express()

//middlewares
app.use(express.json())
app.use(moragan('dev'))

//routes
app.use("/api/v1/user",require("./routes/userRoutes"))
app.use("/api/v1/admin",require("./routes/adminRoutes"))
app.use("/api/v1/trainer",require("./routes/trainerRoutes"))
//listen port
const port=process.env.PORT || 4000

app.listen(port,()=>{
    console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
    .bgCyan.white
);

})