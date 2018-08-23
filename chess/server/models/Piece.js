import { sequelize, Op } from '../databases/database';
import Sequelize from 'sequelize';
import { createNewGame } from './Game';

export const Piece = sequelize.define('piece', {
    pieceid: {
        type: Sequelize.INTEGER
    },
    typeofpiece: Sequelize.TEXT, // K Q R N B P
    playerid: Sequelize.INTEGER, // 1 OR 2
    src: Sequelize.INTEGER,
    isdead: Sequelize.INTEGER,

    gameid: Sequelize.INTEGER
}, { timestamps: false });

export const addNewPiece = async(pieceid, typeofpiece, playerid, src, isdead, gameid) => {

    try {
        await Piece.create({
            pieceid,
            typeofpiece,
            playerid,
            src,
            isdead,
            gameid
        }, {
            fields: ['pieceid', 'typeofpiece', 'playerid', 'currentpos', 'isdead', 'gameid']
        });
    } catch (error) {
        throw error;
    }
}

export const create32Pieces = async(player1id, player2id, gameid) => {
    await addNewPiece(0, R, player2id, 0, 0, gameid)
    await addNewPiece(1, N, player2id, 1, 0, gameid)
    await addNewPiece(2, B, player2id, 2, 0, gameid) 
    await addNewPiece(3, Q, player2id, 3, 0, gameid) 
    await addNewPiece(4, K, player2id, 4, 0, gameid) 
    await addNewPiece(5, B, player2id, 5, 0, gameid) 
    await addNewPiece(6, N, player2id, 6, 0, gameid) 
    await addNewPiece(7, R, player2id, 7, 0, gameid)

    for (let i = 8; i < 16; i++) {
        await addNewPiece(i, P, player2id, i, 0, gameid)
    }

    await addNewPiece(56, R, player1id, 56, 0, gameid) 
    await addNewPiece(57, N, player1id, 57, 0, gameid) 
    await addNewPiece(58, B, player1id, 58, 0, gameid) 
    await addNewPiece(59, Q, player1id, 59, 0, gameid) 
    await addNewPiece(60, K, player1id, 60, 0, gameid) 
    await addNewPiece(61, B, player1id, 61, 0, gameid) 
    await addNewPiece(62, N, player1id, 62, 0, gameid) 
    await addNewPiece(63, R, player1id, 63, 0, gameid)

    for (let i = 48; i < 56; i++) {
        await addNewPiece(i, P, player1id, i, 0, gameid)
    }
}

export const updatePiece = async(pieceid, gameid, updatedisdead, dest) => {

    try {
        var thisPiece = await Piece.findAll({
            attributes: ['pieceid', "gameid", 'typeofpiece', 'playerid', 'currentpos', 'isdead'],
            where: {
                pieceid,
                gameid
            }
        });
        await thisPiece.update({
            currentpos: dest ? dest : currentPos,
            isdead: updatedisdead != 'undefined' ? updatedIsDead : isDead
        });
        return thisPiece;

    } catch (error) {
        throw error;
    }
}

export const pieceAattackPieceB = async(gameId, id1, id2, dest) => {

    try {
        await updatePiece(id1, gameId, null, dest);
        await updatePiece(id2, gameId, 1, null);
    } catch (error) {
        throw error;
    }
}


// squares[0] = new Rook(2);
//  squares[7] = new Rook(2);
//   squares[56] = new Rook(1);
//   squares[63] = new Rook(1);

//   squares[1] = new Knight(2);
//   squares[6] = new Knight(2);
//   squares[57] = new Knight(1);
//   squares[62] = new Knight(1);

//   squares[2] = new Bishop(2);
//   squares[5] = new Bishop(2);
//   squares[58] = new Bishop(1);
//   squares[61] = new Bishop(1);

//   squares[3] = new Queen(2);
//   squares[4] = new King(2);

//   squares[59] = new Queen(1);
//   squares[60] = new King(1);