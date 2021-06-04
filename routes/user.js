const express = require("express")

const router = express.Router()

// localhost:300/api/

router.get('/home', (req, res)=>{
    res.json({
        body:{
            message: "Home API"
        }
    });
})

router.post('/add', (req, res)=>{
    res.json(req.body)
})

module.exports = router