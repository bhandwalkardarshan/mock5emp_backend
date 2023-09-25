const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const cors = require('cors')
const userRoutes = require('./routes/user.routes')
const empRoutes = require('./routes/emp.routes')
const app = express()

require("dotenv").config();
app.use(express.json())
app.use(cors())

app.use('/',userRoutes)
app.use('/employees',empRoutes)


app.listen(process.env.PORT, () => {
    connectDB()
    console.log('Server is running at port '+process.env.PORT)
})

