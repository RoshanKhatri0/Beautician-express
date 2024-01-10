const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
require('./db/connection')
const bodyParser=require('body-parser')

const beauticianProfileRoute=require('./routes/beautificanProfileRoute')

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/api',beauticianProfileRoute)

const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server started on port http://localhost:${port}`)
})