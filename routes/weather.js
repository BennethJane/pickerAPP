const router = require('express').Router();


const { userWeather} = require('../utils/weather');

/**
 * @swagger
 * /api/v1/weather:
 *   get:
 *     tags:
 *       - Weather
 *     summary: Get weather information
 *     description: Weather information based on user location
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Weather information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 location:
 *                   type: string
 *                   description: The user's location
 *                   example: lagos, nigeria
 *                 temperature:
 *                   type: number
 *                   description: The current temperature
 *                   example: 25
 *                 description:
 *                   type: string
 *                   description: A brief description of the weather
 *                   example: Sunny
 *       401:
 *         description: Unauthorized - Missing or invalid authentication token
 *       500:
 *         description: Internal Server Error - An error occurred while retrieving weather information
 */





router.get('/', userWeather)

module.exports = router 