// import React from 'react';
var express = require('express');
var router = express.Router();

import '../index.css';

router.get('/', function (req,res,next) {
  res.send(
    <button className={"square " + props.shade}
       onClick={props.onClick}
       style={props.style}>
    </button>
  )
})


// export default function Square(props) {
	
//     return (
//       <button className={"square " + props.shade}
//       onClick={props.onClick}
//       style={props.style}>
       
//       </button>
//     );
  
// }

module.exports = router;
