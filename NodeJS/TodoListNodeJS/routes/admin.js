import { sequelize, Op } from '../databases/database';

import { List } from '../models/List';

import { Task } from '../models/Task';

import {
  Post,
  getAllPosts,
  createNewPost,
  getPostById,
  updateById,
  deletePost
} from '../models/Post';

// var allPosts = await createNewPost();

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
router.get('/', async (req, res) => {

  try {   
    let allPosts = await getAllPosts();
    
    // console.log(allPosts);
    res.render('admin/dashboard', {getAllPosts: allPosts});
    // res.end();
  }
  catch(error) {
    res.render('admin/dashboard', {error: true});
  }
  
});

router.post('/post/new', async (req,res) => {
  let {title, content, author} = req.body;

  if(title.trim().length == 0) {
    var data = {
      error: 'Please enter a title'
    };
    res.render('admin/post/new', {data: data})
  }
  else {
    try {
      let newPost = await createNewPost(title, content, author);
      if (newPost) {
        let allPosts = await getAllPosts();
        res.render('admin/dashboard', {getAllPosts: allPosts})
      }
      else {
        res.render('admin/dashboard', {error: true});
      }
    } 
  
    catch(error) {
    res.render('admin/dashboard', {error: true});
    }
  }

  

});

router.get('/post/new', function(req, res) {
  res.render('admin/post/new', {data: {error: false}});
});

router.get('/post/edit/:id', async (req, res) => {
  let { id } = req.params; // params k phải body
  // console.log(id);
  try {
    var data = await getPostById(id);
    // console.log(data);
    if(data.id) {
      res.render('admin/post/edit', {data: {post: data}});
    } else {
      error: 'Could not find post with id = '+id;  
    }    
  }  catch(error) {
    res.render('admin/post/edit', {data: {error: "Could not find data"}});
  }
});

router.put('/post/edit/', async (req, res) => {
  // let { id, title, content, author } = req.body; 
  // console.log(id);
  try {
    var data = await updateById(req.body);
    // console.log(data);
    if(data) {
      // console.log(data);
      let allPosts = await getAllPosts();
      // console.log(allPosts);
      res.render('admin/dashboard', {getAllPosts: allPosts});
      // res.json({data: data});
    } else {
      error: 'Could not find post with id = '+id;  
    }    
  }  catch(error) {
    res.render('admin/post/edit', {data: {error: "Could not edit data"}});
  }
});

router.delete('/post/delete', async(req, res) => {
    let {id} = req.body;

    try {
      var data = await deletePost(id);
      // console.log(data);
      if (data) {
        let allPosts = await getAllPosts();
        res.render('admin/dashboard', {getAllPosts: allPosts});
      }
      else {
        error: 'Could not delete post with id = '+id;
      }
    }
    catch(error) {
      error: 'Could not delete post with id = '+id;
    }
})



// router.post('/post/new', function(req, res) {
//   const {} = req.body;


// })

// router.get('/signup', (req, res) => {
//   res.render('signup');
// });

// router.get("/List", (req, res) => {
    
//   // req.query
//   List.findAll({
//     attributes: ["id",
//                 "name",
//                 "priority",
//                 "description",
//                 "duedate"]
//   }).then(lists => {
//       res.json({
//         result: 'SUCCESS',
//         data: lists,
//         description: `query List successfully`      
//       });    
//   }).catch(err => {
//     res.json({
//         result: 'FAILED',
//         data: "",
//         description: `Query List failed. Error = ${JSON.stringify(err)}`      
//     });    
//   });  
// });

// router.get("/tasks/:taskId", (req, res) => {
//   res.json({
//     result: "success",
//     method: "GET",
//     description: `You send ${JSON.stringify(req.params)}, taskId: ${JSON.stringify(req.params)}`
//   });
// });


module.exports = router;
