const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedin = req.get('cookie').split(';')[0].trim().split('=')[1];
  // console.log(isLoggedin);
  // console.log(req.get('cookie').split(';')[0].trim().split('=')[1]);
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5e4152d47754c42900038a48")
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect("/");
      })
    })
    .catch(err => console.log(err));
};

exports.postlogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};
