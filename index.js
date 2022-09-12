const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose')
const AppRoute =  require('./src/routes/app.route');
const authRoute = require('./src/routes/auth.route');
const courseRoute = require('./src/routes/course.route');


app.use(express.json());
app.use(cors());
app.use('/api', AppRoute);
app.use('/auth', authRoute)
app.use('/api', courseRoute)


app.get('/',(req,res)=>{
    res.send('HELLO WELCOME TO THE E-LEARNING APP BACKEND')
})


const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/E-learning-app')
.then(() => {
  app.listen(PORT, () => {
    console.log(`Database connected and server running on port: ${PORT}`);
  })
})
.catch((err) => {console.log(new Error(err))})