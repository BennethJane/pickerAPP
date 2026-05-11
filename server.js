const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 5945;
require('./database/database');
const userRouter = require('./routes/userRouter')
const restaurantRouter = require('./routes/restaurant')
const orderRouter = require('./routes/order')
const facebookRoute = require('./routes/facebook')
const locationRoute = require('./routes/location')
const expressSession = require('express-session')
const passport = require('passport');
const weatherRoute = require('./routes/weather')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
// require('./controller/passport')
// require('./controller/facebook')
// require('./controller/github')


const app = express();
app.use(express.json());
app.use(expressSession({secret: 'olachi', saveUninitialized:false,resave:false}))
app.use(passport.initialize());
app.use(passport.session())
app.use('/api/v1/user',userRouter);
app.use('/api/user',locationRoute);
// app.use('/api/users',facebookRoute);
app.use('/api/restaurant', restaurantRouter);
app.use('/api', orderRouter);
app.use('/api/v1/weather',weatherRoute);


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Picker Web Application',
    version: '2.0.0',
    description:
      `This is a REST API application made with Express. It retrieves data from JSONPlaceholder.
       The base Url is:http://localhost:2025`,
    license: {
      name: 'Official Url',
      url: 'https://google.com',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:2025',
      description: 'Development server',
    },
  ],
  security:[
  {
    bearerAuth:[]
  }
],

components: {
  securitySchemes:{
    bearerAuth:{
      type:'http',
      scheme:'bearer',
      bearerFormat:'JWT'
    }
  }
}
};




const options ={
    swaggerDefinition,
    apis:['./routes/*.js']
}
 const swaggerSpec = swaggerJsdoc(options)

 app.use('/api/v1/documention',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

//  api.use('/api/v2/documentions',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

app.use((req,res,next)=>{

})


app.use((err,req,res,next)=>{
    if(err.name === 'MulterError'){
        return res.status(400).json({
            message:'file upload failed'
        })
    }
    if (err.name === 'JsonwebTokenError'){
        return res.status(400).json({
            message:'session expired,please login again'
        })
    }
    res.status(500).json({
        message:err.message
    })
})




// app.use((req,res,next)=>{
//     res.status(500).json({
//      message:`route ${req.originalUrl}and ${req.method}not found`
//     })
// })

// app.use((error,req,res,next)=>{
//     res.status(error.statusCode).json({
//         message: error.message, 
//         status:error.statusCode
//     })
// })





const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, ()=> {
    console.log(`Server listening to Port: ${PORT}`);
})
    
})
.catch((error) => {
    console.log(error.message);
    
})
