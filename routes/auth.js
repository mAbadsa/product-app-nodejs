const express = require("express");
const { check } = require('express-validator');

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postlogout);

router.get("/signup", authController.getSignup);

router.post("/signup",[check('email').isEmail(), check('password').isLength({ min: 7 })] , authController.postSignup);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
