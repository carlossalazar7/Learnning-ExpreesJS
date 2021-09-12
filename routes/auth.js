const express = require("express")
const router = express.Router()
const UserModel = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
    /*paso 1 verificar correo, paso 2 verificar contraseña, paso 3 retornar response*/
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) return res.send('invalid email!!')

        const passVerfication = await bcrypt.compare(req.body.password, user.password)
        if (!passVerfication) return res.send('invalid password!!')

        const token = jwt.sign({_id: user.id}, process.env.SECRET)
        user.password = undefined
        res.json({
            body:{
                user: user,
                token: token
            }
        })
})




module.exports = router