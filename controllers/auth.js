const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendGridTransport({
  auth: {
    api_key: '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'
  }
}))

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if(message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if(message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash("error", "Invalid Email or Password!");
        return res.redirect("/login");
      }

      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect("/");
            });
          }
          return res.redirect("/login");
        })
        .catch(err => {
          console.log(err);
          return res.redirect("/login");
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  if(!email || !password) {
    req.flash("error", "Email and Password is required!");
    return res.redirect("/signup");
  }

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash("error", "E-mail exists already, Please pick a different one.");
        return res.redirect("/signup");
      }
      return bcrypt
      .hash(password, 8)
      .then(hashPassword => {
        const user = new User({
          email: email,
          password: hashPassword,
          cart: { items: [] }
        });
        return user.save();
      })
      .then(result => {
        res.redirect("/login");
        return transporter.sendMail({
          to: email,
          from: 'product-app@node.com',
          subject: 'Successfull login',
          html: '<h1>You Successfully Signed up!</h1>'
        })
      }).catch(err => console.log(err));
    })
    .catch(err => {
      console.log(err);
      res.redirect("/signup");
    });
};

exports.postlogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};
