var express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
const UserRegisterValidation = require('../validation/authValidation');
const { registerAPI, loginApi} = authController
const {registerValidation} = UserRegisterValidation;
router.post("/register", registerValidation, registerAPI);
router.post("/login", loginApi);

module.exports = router