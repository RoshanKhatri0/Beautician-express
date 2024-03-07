const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
require('./db/connection')
const bodyParser=require('body-parser')
const cors = require('cors')

const beauticianProfileRoute=require('./routes/beautificanProfileRoute')
const userRoute=require('./routes/userRoute')

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

//routes
app.use('/api',beauticianProfileRoute)
app.use('/api',userRoute)


const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server started on port http://localhost:${port}`)
})