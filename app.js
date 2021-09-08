const express = require("express")
const app = express()
const mongoose = require('mongoose')
const env = require('dotenv/config')
app.use(express.json()) /*use este cuando envie por raw body */
// app.use(express.urlencoded({ extended: true }))  /*use este cuando envie por x-www-form-urlencoded */
const useRouter = require('./routes/user'); /*utilizar los routers creados en user.js*/
app.use('/api/', useRouter)
app.listen('3000', () => {
    console.log("The server is  running!!!");
})

mongoose.connect( /* crear conexion a mongo db */
    process.env.DB, /* esta linea manda a llamar los paramtros de conecion en el archivo .env */
    { useNewUrlParser: true, useUnifiedTopology: true }, (e) => {
        if (e) return console.log(e.message);
        console.log('database connected');
    })