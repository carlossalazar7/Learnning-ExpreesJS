const express = require("express")
const router = express.Router()
const UserModel = require('../models/User')
// localhost:300/api/

router.get('/home', (req, res) => {
    res.json({
        body: {
            message: "Home API"
        }
    });
})

//insert into table users
router.post('/add', async (req, res) => {
    // res.json(req.body)
    //---------------------instancia de obj-----------------
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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
router.get('/all', async (req, res) => {
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
        _id : id
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
        {_id : id},
        {$set: req.body}
    )
    try {
        res.send(update)
    } catch (e) {
        res.send(e)
    }
})
module.exports = router