const express =require('express')
const { check, validationResult } = require('express-validator');


const router=express.Router();
router.get('/',(req,res)=>{
    res.send('profiles')
})

module.exports=router