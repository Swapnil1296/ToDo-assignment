const express = require('express');
const {
  register,
  login,
  generateToken,
} = require('./controllers/authController');
const User = require('./models/user.model');
const {body, validationResult} = require('express-validator');
var cors = require('cors');
const app = express();
require('dotenv').config();
const jwt = require('jsonwebtoken');

// const passport = require("./configs/googleOauth");

app.use(cors());
app.use(express.json());

const todoController = require('./controllers/todoController');

const userController = require('./controllers/userController');

app.use('/todo', todoController);
app.use('/user', userController);

app.post(
  '/register',
  body('name')
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage('Name cannot be empty')
    .isLength({min: 3})
    .withMessage('Name must be at least 4 characters'),
  body('email')
    .isEmail()
    .custom(async (value, {req}) => {
      const user = await User.findOne({email: req.body.email});

      if (user) {
        throw new Error('Email is already taken');
      }
      return true;
    }),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .custom((value, {req}) => {
      if (value !== req.body.confirmPassword) {
        throw new Error('Password and confirm password should match');
      }
      return true;
    }),
  // body('phone').custom((value) => {
  //   if (value && value.length != 10) {
  //     throw new Error('phone number should have 10 digits');
  //   }
  //   return true;
  // }),
  register
);

app.post(
  '/login',
  body('email')
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({email: value});

      if (!user) {
        throw new Error('Email is not registered');
      }
      return true;
    }),
  body('password').not().isEmpty().withMessage('Password is required'),
  login
);

app.use('/', (req, res) => {
  res.send(
    `<h1 style="color:#C7AA8D;font-size:46px;margin:20px auto;">Welcome to FullStack Todo-App API</h1>`
  );
});

module.exports = app;
