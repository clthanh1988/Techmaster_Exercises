var express = require('express');
var router = express.Router();

import { Player, insertPlayer, findPlayerById, loginPlayer, getAvailablePlayers, updatePlayer } from '../models/Player';
import { Game, createNewGame  } from '../models/Game';
import { Piece, addNewPiece, create32Pieces, updatePiece, pieceAattackPieceB  } from '../models/Piece';
import { CLIENT_RENEG_LIMIT } from 'tls';

router.post('/register', async (req,res) => {   
    try {
        let { email, password, name, isplaying, tokenkey } = req.body;
        // console.log(`name = ${name}`);
        //Validate
        let newPlayer = await insertPlayer(email, password, name, isplaying, tokenkey);                
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
router.post('/login', async (req,res) => {   
    try {
        let { email, password } = req.body;
        //Validate
        let loggedPlayer = await loginPlayer(email, password);                
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

router.post('/update', async(req,res) => {
    

    try {
        let {id, isplaying, name, password, tokenkey} = req.body;
        // console.log(isplaying);
        let updatedPlayer = await updatePlayer(id, isplaying, name, password, tokenkey);
        if (!updatedPlayer) {
            res.json({
                result: 'false',
                data: {},
                message: "Update player failed"
            })
        }
        else {
            res.json({
                result: 'ok',
                data: updatedPlayer,
                message: "Update player success"
            })
        }
    }
    catch(error) {
        res.json({
            result: 'false',
            data: {},
            message: "Update player failed. Error" + error
        })
    }



})


// router.post('/getAvailablePlayers', async() => {
//     try {
//         let 
//     }
//     catch(error) {
//         throw error;
//     }


// })

module.exports = router;
