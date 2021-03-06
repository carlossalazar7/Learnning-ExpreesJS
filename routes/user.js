const express = require("express")
const router = express.Router()
const UserModel = require('../models/User')
const Joi = require('@hapi/joi')
const brycpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require('./verifyjwt')
// localhost:300/api/

router.get('/home', (req, res) => {
    res.json({
        body: {
            message: "Home API"
        }
    });
})

//---------------pasos para encrypar constraseñas----------------------
/*---------------paso 1: generate  a salt -> ramdom text*/
/*---------------paso 1: hash a password  -> hash(10, salt)*/

router.get('/token', async (req, res)=>{
    const token = jwt.sign({_id:'ds_123456'},process.env.SECRET)
    res.send(token)
})

//insert into table users
router.post('/add', async (req, res) => {
    // res.json(req.body)

    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().min(5).email().required(),
        password: Joi.string().min(6).required()
    }   
    const {error} = Joi.validate(req.body, schema);
    if (error) return  res.send(error.details[0].message);  
    const salt  = await brycpt.genSalt(10)
    const hashPassword =await brycpt.hash(req.body.password, salt)

    //---------------------instancia de obj-----------------
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    //----------------------tercera forma--------------------
    // user.save()
    //     .then(resp => {
    //         res.send(resp)
    //     })
    //     .catch(err => {
    //         res.send(err)
    //     })
    //----------------------segunda forma---------------------
    // user.save(function (err, resp) {
    //     if (err) return res.send(err)
    //     res.send(resp)
    // })
    //----------------------tercera forma---------------------
    const save = await user.save();
    try {
        res.send(save)
    } catch (e) {
        res.send(e)
    }
})
//select all
router.get('/all', verifyToken, async (req, res) => {
    const users = await UserModel.find();
    try {
        res.send(users);
    } catch (error) {
        res.send(error)
    }
})
//select by id
router.get('/user/:id', async (req, res) => {
    const id = req.params.id
    const user = await UserModel.findById(id)
    try {
        res.send(user)
    } catch (e) {
        res.send(e)
    }
})
//delete
router.delete('/user/:id', async (req, res) => {
    const id = req.params.id
    const deleteuser = await UserModel.remove({
        _id: id
    })
    try {
        res.send(deleteuser)
    } catch (e) {
        res.send(e)
    }
})
//update
router.patch('/user/:id', async (req, res) => {
    const id = req.params.id
    const update = await UserModel.update(
        { _id: id },
        { $set: req.body }
    )
    try {
        res.send(update)
    } catch (e) {
        res.send(e)
    }
})
module.exports = router