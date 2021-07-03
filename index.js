const express=require('express')
const app = express();

app.get('/',(req,res)=>{
    
    res.send('hello')
})

app.listen(4000,()=>{
    console.log('the server is up and running on port 4000')
})