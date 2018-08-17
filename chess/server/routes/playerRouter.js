var express = require('express');
var router = express.Router();

import { Player, insertPlayer, findPlayerById, loginPlayer } from '../models/Player';
import { Game, createNewGame  } from '../models/Game';
import { Piece, addNewPiece, create32Pieces, updatePiece, pieceAattackPieceB  } from '../models/Piece';

router.post('/register', async (req,res,next) => {   
    try {
        let { name, password } = req.body;
        // console.log(`name = ${name}`);
        //Validate
        let newPlayer = await insertPlayer(name, password);                
        if (newPlayer) {
            res.json({
                status: 'ok',
                data: newPlayer,
                message: "Create new Player success"
            })
        } else {
            res.json({
                status: 'false',
                data: {},
                message: "Create new Player failed"
            })    
        }                
    } 
    catch(error) {
        res.json({
            status: 'false',
            data: {},
            message: "Create new Player failed. error "+error
        })
    }

})
router.post('/login', async (req,res,next) => {   
    try {
        let { name, password } = req.body;
        //Validate
        let loggedPlayer = await loginPlayer(name, password);                
        if (loggedPlayer) {
            res.json({
                status: 'ok',
                data: loggedPlayer,
                message: "Login Player success"
            })
        } else {
            res.json({
                status: 'false',
                data: {},
                message: "Login Player failed"
            })    
        }                
    } catch(error) {
        res.json({
            status: 'false',
            data: {},
            message: "Login Player failed. error "+error
        })
    }

})

module.exports = router;
