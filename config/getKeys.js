
const keys=require('./keys')
if(process.env.NODE_ENV==='production'){
    module.exports=require('./keys')
}else{
    module.exports=require('./keys_dev')
}