const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req,res)=>{
    console.log('-----------------------at profile / ')
    // res.send('you are logged in')
    // res.sendFile(path.join(__dirname, '../../index.html'));
    res.redirect('/')
} )

module.exports = router;