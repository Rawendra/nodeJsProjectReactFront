const express =require('express')
const { check, validationResult } = require('express-validator');


const router=express.Router();
router.post('/',(req,res)=>{;
    console.log(req.body)
    res.send('auth')
})
module.exports=router