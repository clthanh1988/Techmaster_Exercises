import { sequelize, Op } from '../databases/database';
import Sequelize from 'sequelize';
import { createNewGame } from './Game';

export const Piece = sequelize.define('piece', {
    pieceId: {
        type: Sequelize.INTEGER        
    },
    typeOfPiece: Sequelize.STRING, // 'K' 'Q' 'R' 'N' 'B' 'P'
    playerId: Sequelize.INTEGER, // 1 OR 2
    currentPos: Sequelize.INTEGER,
    isDead: Sequelize.INTEGER,
   
    gameId: Sequelize.INTEGER
});

export const addNewPiece = async (id, typeOfPiece, playerId, currentPos, isDead, updatedat, gameId) => {
    
    try {
        await Piece.create({
            id,
            typeOfPiece,
            playerId,
            currentPos,
            isDead,
            updatedat,
            gameId
        }, {
            fields: ['id', 'typeOfPiece', 'playerId', 'currentPos', 'isDead', 'updatedat', 'gameId']
        });
    }

    catch(error) {
        throw error;
    }
}

export const create32Pieces = async (player1Id, player2Id,gameId) => {
    await addNewPiece(0, 'R', player2Id, 0, 0, updatedat, gameId)
    await addNewPiece(1, 'N', player2Id, 1, 0, updatedat, gameId)
    await addNewPiece(2, 'B', player2Id, 2, 0, updatedat, gameId)
    await addNewPiece(3, 'Q', player2Id, 3, 0, updatedat, gameId)
    await addNewPiece(4, 'K', player2Id, 4, 0, updatedat, gameId)
    await addNewPiece(5, 'B', player2Id, 5, 0, updatedat, gameId)
    await addNewPiece(6, 'N', player2Id, 6, 0, updatedat, gameId)
    await addNewPiece(7, 'R', player2Id, 7, 0, updatedat, gameId)
    
    for (let i = 8; i< 16; i++) {
        await addNewPiece(i, 'P', player2Id, i, 0, updatedat, gameId)
    }
   
    await addNewPiece(56, 'R', player1Id, 56, 0, updatedat, gameId)
    await addNewPiece(57, 'N', player1Id, 57, 0, updatedat, gameId)
    await addNewPiece(58, 'B', player1Id, 58, 0, updatedat, gameId)
    await addNewPiece(59, 'Q', player1Id, 59, 0, updatedat, gameId)
    await addNewPiece(60, 'K', player1Id, 60, 0, updatedat, gameId)
    await addNewPiece(61, 'B', player1Id, 61, 0, updatedat, gameId)
    await addNewPiece(62, 'N', player1Id, 62, 0, updatedat, gameId)
    await addNewPiece(63, 'R', player1Id, 63, 0, updatedat, gameId)

    for (let i = 48; i< 56; i++) {
        await addNewPiece(i, 'P', player1Id, i, 0, updatedat, gameId)
    }
}

export const updatePiece = async (id, gameId, updatedIsDead, dest) => {
    
    try {
        let thisPiece = await Piece.findAll({
            attributes: ['id', "gameId", 'typeOfPiece', 'playerId', 'currentPos', 'isDead', 'updatedat'],
            where: {
                id,
                gameId,
            }
        });
        await thisPiece.update({
            currentPos: dest ? dest: currentPos,
            isDead: updatedIsDead != 'undefined' ? updatedIsDead : isDead
        });
        return thisPiece;

    }
    catch(error) {
        throw error;
    }
}

export const pieceAattackPieceB = async (gameId, id1, id2, dest) => {
    
    try {
        await updatePiece(id1, gameId, null, dest);
        await updatePiece(id2, gameId, 1, null);
    }
    catch(error) {
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
