const router = require('express').Router();
// const User = require('../app/models/user.model');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation, forgetPasswordValidation } = require('../validations/auth.validation');
const { login, register, forgetPasswordUser, verifyCodeUser } = require('../app/controllers/auth.controller')
// const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth.middleware');
const { validate } = require('express-validation')
const asyncWrap = require('../utils/asyncWrap')

// //Register
// // router.post('/register', async (req, res) => {
// //     //Validate schema before add a user
// //     const { error } = registerValidation(req.body);
// //     if (error)
// //         return res.status(400).json({ message: error.details[0].message });

// //     //Checking if the email is already in the database
// //     const emailExist = await User.findOne({ email: req.body.email });
// //     if (emailExist)
// //         return res.status(400).json({ message: 'Email already exists' });

// //     //Hash password
// //     const salt = await bcrypt.genSalt(10);

// //     const hashedPassword = await bcrypt.hash(req.body.password, salt);

// //     //Create a new user
// //     const user = new User({
// //         name: req.body.name,
// //         email: req.body.email,
// //         password: hashedPassword,
// //         role: req.body.role,
// //     });
// //     try {
// //         const savedUser = await user.save();
// //         res.status(201).json(savedUser);
// //     } catch (err) {
// //         res.status(400).json({ message: err.message });
// //     }
// // });

// // Login
// router.post('/login', async (req, res) => {
//     //Validate schema
//     const { error } = loginValidation(req.body);
//     if (error)
//         return res.status(400).json({ message: error.details[0].message });

//     //Checking if the email is not already in the database
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) return res.status(400).json({ message: 'Email is wrong' });

//     //Check password
//     const validPass = await bcrypt.compare(req.body.password, user.password);
//     if (!validPass)
//         return res.status(400).json({ message: 'Invalid password' });

//     //Create and assign a token
//     const token = jwt.sign(
//         { email: user.email, role: user.role, name: user.name },
//         process.env.TOKEN_SECRET || "token_secret"
//     );
//     res.json({ accessToken: token });
// });

// router.post('/', auth('admin'), async (req, res) => {
//     try {
//         res.status(200).json({});
//     } catch (error) {
//         res.status(402);
//     }
// });

router.post('/user/login', validate(loginValidation), asyncWrap(login));
router.post('/user/register', validate(registerValidation), asyncWrap(register));
router.post('/user/forget-password', validate(forgetPasswordValidation), asyncWrap(forgetPasswordUser));
router.post('/user/verify-code', asyncWrap(verifyCodeUser));

module.exports = router;
