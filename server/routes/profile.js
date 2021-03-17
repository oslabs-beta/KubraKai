const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req,res)=>{
    console.log('-----------------------at profile / ')
    // res.send('you are logged in')
    res.sendFile('/home/tony/Documents/codesmith/production_proj/KubraKai/index.html');
} )

module.exports = router;