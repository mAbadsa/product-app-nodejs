const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email!"),
    body(
      "password",
      "Please Enter Password With Number and Text And At Least 7 characters."
    )
      .isLength({ min: 7 })
      .isAlphanumeric()
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
      .withMessage("Please enter a valid email!"),
    body(
      "password",
      "Please Enter Password With Number and Text And At Least 7 characters."
    )
      .isLength({ min: 7 })
      .isAlphanumeric()
    // body("confirmPassword", "Please Enter Correct Password").custom(value => {
    //   return value === confirmPassword
    // }),
  ],
  authController.postSignup
);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
