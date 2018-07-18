import { sequelize, Op } from '../databases/database';

import { List } from '../models/List';

import { Task } from '../models/Task';

//Test DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  }); 

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/signup', (req, res) => {
//   res.render('signup');
// });

router.get("/List", (req, res) => {
    
  // req.query
  List.findAll({
    attributes: ["id",
                "name",
                "priority",
                "description",
                "duedate"]
  }).then(lists => {
      res.json({
        result: 'SUCCESS',
        data: lists,
        description: `query List successfully`      
      });    
  }).catch(err => {
    res.json({
        result: 'FAILED',
        data: "",
        description: `Query List failed. Error = ${JSON.stringify(err)}`      
    });    
  });  
});

router.get("/tasks/:taskId", (req, res) => {
  res.json({
    result: "success",
    method: "GET",
    description: `You send ${JSON.stringify(req.params)}, taskId: ${JSON.stringify(req.params)}`
  });
});


module.exports = router;
