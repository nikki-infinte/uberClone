const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes');
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

connectToDb()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', userRoutes)


module.exports = app