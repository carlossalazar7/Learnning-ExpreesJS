const express = require("express")
const app = express()
const mongoose = require('mongoose')
const env = require('dotenv/config')
// use este cuando envie por raw body
app.use(express.json())
//  use este cuando envie por x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true })) 

// utilizar los routers creados en user.js
const useRouter = require('./routes/user');
app.use('/api/', useRouter)

app.listen('3000', () => {
    console.log("The server is  running!!!");
})
//crear conexion a mongo db
mongoose.connect(
    process.env.DB, /* esta linea manda a llamar los paramtros de conecion en el archivo .env */
    { useNewUrlParser: true, useUnifiedTopology: true }, (e) => {
        if (e)  return console.log(e.message);
        console.log('database connected');
    })