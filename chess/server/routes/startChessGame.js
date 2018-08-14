var express = require('express');
var router = express.Router();

router.get('/startGame', async (req,res,next) => {
    let data = [];
    
    let { player1, player2 } = req.body;
    
    if(player1.name === player2.name) {
        var data = {
            error: 'Game must have 2 players'
        };
    }
    else {
        try {
            var board = await getBoard(req.body)
        
        }
        catch(err) {
            error
        }
    }


})