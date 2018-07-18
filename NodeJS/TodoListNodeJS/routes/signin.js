var express = require('express');
var router = express.Router();

import {
  sequelize,
  Op
} from '../databases/database';
import Sequelize from 'sequelize';

import {
  User
} from '../models/User';
// import {User} from '../models/User';

//   import {keySecret, saltRounds} from '../config/config';
import bcrypt from 'bcrypt';

router.get('/', (req, res) => {

  res.render('signin', {
    data: {}
  });
});

router.post('/', async (req, res) => {
  // var params = req.body;
  const {
    email,
    password
  } = req.body;
  // console.log(params);
  if (email.trim().length == 0) {
    res.render('signin', {
      data: {
        error: 'Please enter an email'
      }
    });
  }

  if (password.trim().length == 0) {
    res.render('signin', {
      data: {
        error: 'Please enter a password'
      }
    });
  }

  try {
    let existingUsers = await User.findAll({
      where: {
        email
      }
    });
    if (existingUsers.length > 0) {
      let hash = await existingUsers[0].password;
      let result = await bcrypt.compare(password, hash);
      if (result) {
        res.json({
          message: 'Login success'
        });
      } else {
        //sai pass ko dang nhap dc
        res.json({
          message: 'Wrong password'
        });
      }
    } else {
      res.json({
        message: 'No user existed'
      });
    }


  } catch (error) {
    res.json({
      message: `${error}`
    });
  }
});

module.exports = router;