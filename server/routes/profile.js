const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/user8@user8', (req,res)=>{
    console.log('-----------------------at profile / ')
    res.send('you are logged in')
} )

module.exports = router;