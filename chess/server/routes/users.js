var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  res.json({
    result: "ok",
    products: [
      {
        name: "iphone 2",
        year: 2001
      },
      {
        name: "iphone 3",
        year: 2003
      },
      {
        name: "iphone 4",
        year: 2004
      }
    ]
  });
});

module.exports = router;
