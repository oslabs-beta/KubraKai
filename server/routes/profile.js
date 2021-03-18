const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req,res)=>{
    console.log('-----------------------at profile / ')
    res.redirect('/')
} )

module.exports = router;