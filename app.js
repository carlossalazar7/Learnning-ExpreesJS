const express = require("express")
const app = express()

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

