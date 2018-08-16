var express = require('express');
var router = express.Router();

import { Player, insertPlayer, findPlayerById  } from '../models/Player';
import { Game, createNewGame  } from '../models/Game';
import { Piece, addNewPiece, create32Pieces, updatePiece, pieceAattackPieceB  } from '../models/Piece';

router.post('/startGame', async (req,res,next) => {   
    try {
        let { player1Id, player2Id } = req.body;
        //Validate
        let newGame = await createNewGame(player1Id, player2Id);                
        if (newGame) {
            await create32Pieces(player1Id, player2Id, newGame.gameId);
            res.json({
                status: 'ok',
                data: newGame
            })
        } else {
            res.json({
                status: 'false',
                data: {},
                message: "Cannot create a new game!"
            })    
        }                
    } catch(error) {
        res.json({
            status: 'false',
            data: {},
            message: "Cannot start a game"
        })
    }

})
/*
router.post('/createRoom', async (req,res,next) => {
    let {player1Id} = req.body;
    try {
        res.json({
            status: 'Please wait!!! Finding opponent ...'
        })
        await player2Id to join
    }
    catch(error) {
        res.json({
            status: 'False!!! Cannot find opponent !!!'
        })
        return;
    }
    let player2Id = find()
})

router.post('/joinRoom', async (req,res,next) => {
    let {player2Id} = req.body;
    try {

    }
    catch(error) {
        
    }



})
*/
module.exports = router;
