const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5e1f642b0a1e7693cca17ada')
  .then(user => {
    req.user = new User(user.username, user.email, user.cart, user._id);
    next();
  })
  .catch(err => {
    console.log(err);
  })
})


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://Muhammad:WuRr5nIhlPGHii8B@cluster0-hebyh.mongodb.net/test?retryWrites=true&w=majority').then((result) => {
  app.listen(3000);
}).catch(err => console.log(err));