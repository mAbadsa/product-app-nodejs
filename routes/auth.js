const express = require("express");
const { check, body } = require("express-validator");
const User = require("../models/user");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .normalizeEmail(),
    body("password", "Password has to be valid")
      .isLength({ min: 7 })
      .isAlphanumeric()
      .trim()
  ],
  authController.postLogin
);

router.post("/logout", authController.postlogout);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              "E-mail exists already, Please pick a different one"
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please Enter Password With Number and Text And At Least 7 characters."
    )
      .isLength({ min: 7 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword", "Please Enter Correct Password")
    .trim()
    .custom(
      (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password have to match!");
        }
        return true;
      }
    )
  ],
  authController.postSignup
);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
