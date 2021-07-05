const express=require('express');
const connectDB= require('./config/db')
const userRoutes=require('./routes/api/user')
const profileRoutes=require('./routes/api/profile.js')
const authRoutes=require('./routes/api/auth')
const postsRoutes=require('./routes/api/posts')
const app = express();

// Init Middleware
app.use(express.json());




connectDB();

//including all the routes as middleware on express app
app.use('/api/users',userRoutes);
app.use('/api/profiles',profileRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/posts',postsRoutes);
 

app.listen(4000,()=>{
    console.log('the server is up and running on port 4000')
})