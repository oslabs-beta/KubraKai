const express = require('express');
const path = require('path');
const router = express.Router();
const ipController = require("../controllers/ipController")
/* Authors: Danny Ballistocky, Anthony Martinez
 * @param {*} 
 * 
 * 
 * 
 */
router.get('/', (req,res)=>{
    res.redirect('/')
} )

router.post('/ip', ipController.newIp, (req, res) => {
    return res.status(200).send(res.locals.ip); 
})

router.get('/ip', ipController.getIp, (req, res) => {
    return res.status(200).send(res.locals.ip)
})

module.exports = router;