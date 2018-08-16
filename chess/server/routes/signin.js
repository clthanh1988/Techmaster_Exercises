var express = require('express');
var router = express.Router();

import {
  sequelize,
  Op
} from '../databases/database';
import Sequelize from 'sequelize';

import {
  Player
} from '../models/Players';

// import {
//   getAllPosts
// } from '../models/Post'
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
    name,
    password
  } = req.body;
  // console.log(params);
  if (name.trim().length == 0) {
    res.render('signin', {
      data: {
        error: 'Please enter a name'
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
    let existingPlayers = await Player.findAll({
      where: {
        name
      }
    });
    if (existingPlayers.length > 0) {
      let hash = await existingPlayers[0].password;
      let result = await bcrypt.compare(password, hash);
      if (result) {
        // res.json({
        //   message: 'Login success'
        // });
        req.session.user = existingPlayers[0];
        await req.session.save();
        res.redirect('/admin');
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