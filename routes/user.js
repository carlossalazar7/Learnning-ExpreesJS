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

router.post('/add', async (req, res) => {
    // res.json(req.body)
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

module.exports = router