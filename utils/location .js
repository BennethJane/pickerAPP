const locationModel = require('../models/location')
const axios = require('axios')

exports.userLocation = async(req,res)=>{
    try {
         const rawIp = req.headers['x-forwarded-for']|| req.socket.remoteAddress

         const ip = rawIp === "::1" ? "41.203.73.6 ":rawIp

        //  console.log(ip)


        const userAddress = await axios.get( `http://ip-api.com/json/${ip}`)
        const latitude = userAddress.data.lat
        const longitude = userAddress.data.lon
        const apiUrl= `http://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`

        const actualAddress=await axios.get(apiUrl, {headers:{
            "accept":"application/json",
            "user-Agent": "noName(noname@gmail.com)"
        }})
console.log("Actual Address :",actualAddress.data.display_name)

    const address = {
        lat:latitude,
        long:longitude,
        actualAddress:actualAddress.data.display_name
    }

      const data = await locationModel.create(address)
        res.status(200).json({
            message:"location gotten succesfully",
            data:data
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
} 