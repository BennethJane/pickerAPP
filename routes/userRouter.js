const { register, verifyEmail, resendOTP, login, getAllUsers,getOneUser } = require('../controller/userController');
const passport = require('passport')
const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The User Name
 *           example: jane benneth
 *         email:
 *           type: string
 *           description: the user email
 *           example: off@examaple.com
 *         phoneNumber:
 *           type: string
 *           description: the user phone number
 *           example: 12345678910
 *         password:
 *           type: string
 *           description: the user password
 *           example: password123
 */





/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: User registration
 *     description: Register a new user with email, password and other details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: john doe
 *               email:
 *                 type: string
 *                 description: The User's email
 *                 example: example@example.com
 *               phoneNumber:
 *                 type: string
 *                 description: The User phone number
 *                 example: +2348029837465
 *               password:
 *                 type: string
 *                 description: The User's password
 *                 example: password123
 *               confirmPassword:
 *                 type: string
 *                 description: The User's password
 *                 example: password123
 *     responses:
 *       201:
 *         description: user registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: a success message
 *                   example: user reg successfully
 */

router.post('/register', register);
/**
 * @swagger
 * /api/v1/user/verify:
 *   post:
 *     tags:
 *       - Users
 *     summary: verify email
 *     description: Verify the user's email with the provided OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The User's email
 *                 example: example@example.com
 *               password:
 *                 type: string
 *                 description: The User's password
 *                 example: password123
 *     responses:
 *       201:
 *         description: user has successfully login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: a success message
 *                   example: user verify email successfully
 */


router.post('/verify', verifyEmail);

router.post('/resend-otp', resendOTP);
/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: login
 *     description: Register a new user with email, password and other details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The User's email
 *                 example: example@example.com
 *               password:
 *                 type: string
 *                 description: The User's password
 *                 example: password123
 *     responses:
 *       201:
 *         description: user has successfully login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: a success message
 *                   example: user login successfully
 */



router.post('/login', login);

router.get('/collect', passport.authenticate('google', {scope: ['profile', 'email']}))

router.get('/googleLogin', passport.authenticate('google', {
    successRedirect: '/api/user/loginsuccess', 
    failureRedirect: '/api/user/loginfailed'}))

router.get('/loginsuccess', (req, res) => {
        res.json({message: 'Login successful', 
            data: req.user})
    })

router.get('/loginfailed', (req, res) => {
        res.json({message: 'Login failed'})
    })  
    

router.get('/githubLogin', passport.authenticate('github2'));

router.get('/githubLogin/callback',passport.authenticate('github2', {failureRedirect: '/login',session: false}),
  (req, res)  => {
    res.json({message:"GitHub login successful", data:req.user});
  }
);

// router.get('/auth/facebook',
//   passport.authenticate('facebook'));

// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//    });


/**
 * @swagger
 * /api/v1/user/getAllUsers:
 *   get:
 *     tags:
 *       - Users
 *     summary: All Users
 *     description: Get all users in the database
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The User ID
 *                         example: 69f6fc59f069dce732d54a15
 *                       name:
 *                         type: string
 *                         description: The User's First Name
 *                         example: John
 *                       lastName:
 *                         type: string
 *                         description: The User's Last Name
 *                         example: Doe
 *                       email:
 *                         type: string
 *                         description: The User's Email
 *                         example: example@example.com
 *                       phoneNumber:
 *                         type: string
 *                         description: The User's Phone Number
 *                         example: +2348012345678
 *                       isVerified:
 *                         type: boolean
 *                         description: The User's Verification Status
 *                         example: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The User's Creation Date
 *                         example: 2026-05-04T15:56:49.406Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The User's Update Date
 *                         example: 2026-05-04T15:56:49.406Z
 *              
 */
router.get('/getAllUsers',getAllUsers)

/**
 * @swagger
 * /api/v1/user/getone/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: A User
 *     description: Get one user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The User Id
 *         schema:
 *           type: string
 *           example: 875674563782983746578439
 *     responses:
 *       200:
 *         description: display user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The User Id
 *                       example: 787674563782983746578439
 *                     firstName:
 *                       type: string
 *                       description: The User first name
 *                       example: jane
 *                     lastName:
 *                       type: string
 *                       description: The User last name
 *                       example: Benneth
 *                     email:
 *                       type: string
 *                       description: The User email
 *                       example: example@example.com
 *                     phoneNumber:
 *                       type: string
 *                       description: The User phone number
 *                       example: +2349095646367
 *                     isVerified:
 *                       type: boolean
 *                       description: The User verification status
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The User creation date
 *                       example: 2026-05-04
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The User update time
 *                       example: 2026-05-04
 * 
 */
router.get('/getone/:id',getOneUser)

module.exports = router