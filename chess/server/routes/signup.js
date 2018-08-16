var express = require('express');
var router = express.Router();

import {
  sequelize,
  Op
} from '../databases/database';
import Sequelize from 'sequelize';

import bcrypt from 'bcrypt';

// var helper = require('../helpers/helpers')

// var user_md = require('../models/User');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('signup', { name : "Hoang"});
// });

router.get('/', (req, res) => {

  res.render('signup', {
    data: {}
  });
});

// router.post('/', (req, res) => {
//   let user = req.body;
//   // console.log(`user === ${JSON.stringify(user)}`);

//   if(user.email.trim().length == 0) {
//     res.render('signup', {data: {error: "Email is required"}});
//   }


//    if(user.passwd != user.repasswd && user.passwd.trim().length != 0){
//     res.render('signup', {data: {error: "Password is not matched"}});
//   }

//   // Insert to DB
//   user = {
//     email: user.email,
//     password: user.passwd,
//     firstName: user.firstname,
//     lastName: user.lastname,
// }
//   var result = user_md.addUser(user);  

//   if(!result) {
//     res.render('signup', {data: {error: 'Could not insert user data to DB'}})
//   }
//   else {
//     res.json({message: 'Insert success'});
//   }

//   // user_md.addUser(user);
//   //res.render('/', {data: {}});
// })
import {
  User
} from '../models/User';

import {
  keySecret,
  saltRounds
} from '../config/config';



router.post('/', async (req, res) => {
  const {
    email,
    password,
    firstname,
    lastname,
    repassword
  } = req.body;

  if (email.trim().length == 0) {
    res.json({
      data: {
        error: "Email is required"
      }
    });
  }


  if (password != repassword && password.trim().length != 0) {
    res.json({
      data: {
        error: "Password is not matched"
      }
    });

  }


  try {
    const hash = await bcrypt.hash(password, saltRounds);
    let users = await User.findAll({
      where: {
        email
      }
    });
    if (users.length > 0) {
      //user da ton tai
    } else {
      console.log(firstname);
      console.log(lastname);

      const addUser = await User.create({
        email,
        password: hash,
        firstname,
        lastname
      });
      res.redirect('/signin');
    }
  } catch (error) {
    res.json({
      message: `${error}`
    });

  }
})

module.exports = router;