const weatherModel = require('../models/weather')
const axios = require('axios')

exports.userWeather = async(req,res,next)=>{
    try {
         const rawIp = req.headers['x-forwarded-for']|| req.socket.remoteAddress

         const ip = rawIp === "::1" ? "41.203.73.6 ":rawIp

        //  console.log(ip)


        const userAddress = await axios.get( `http://ip-api.com/json/${ip}`)
        const latitude = userAddress.data.lat
        const longitude = userAddress.data.lon
        const apiUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.weather_key}`

        const actualWeather=await axios.get(apiUrl);

        const weather = {
        lat:latitude,
        long:longitude,
        weatherTemp:actualWeather.data.main.temp
    }

      const data = await weatherModel.create(weather)
        res.status(200).json({
            message:"weather gotten succesfully",
            data:data
        })

    } catch (error) {
        next({
            message:error.message,
             statusCode:500
        })
        
    }
} 