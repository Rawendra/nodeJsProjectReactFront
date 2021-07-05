const express =require('express')
const { check, validationResult } = require('express-validator');


const router=express.Router();

router.post('/',[ check('name', 'Name is required').notEmpty(),
check('email', 'Please include a valid email').isEmail(),
check(
  'password',
  'Please enter a password with 6 or more characters'
).isLength({ min: 6 })],(req,res)=>{
    const errors=validationResult(req);
    console.log(errors);
    
    if(!errors.length){
        return res.status(400).json({ errors: errors });
    };
    res.send('u r in...')

})

router.get('/',(req,res)=>{
    console.log('user router is called');
    res.send('hello from user')
})

module.exports = router;