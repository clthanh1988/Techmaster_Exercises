import { sequelize, Op } from '../databases/database';
import Sequelize from 'sequelize';
import { createNewGame } from './Games';

export const Piece = sequelize.define('piece', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    typeOfPiece: Sequelize.STRING, // K Q R N B P
    playerId: Sequelize.INTEGER, // 1 OR 2
    currentPos: Sequelize.INTEGER,
    isDead: Sequelize.INTEGER,
   
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updatedat'
    },
    gameId: Sequelize.INTEGER
});

export const addNewPiece = async (id, typeOfPiece, playerId, currentPos, isDead, updatedAt, gameId) => {
    
    try {
        await Piece.create({
            id,
            typeOfPiece,
            playerId,
            currentPos,
            isDead,
            updatedAt,
            gameId
        }, {
            fields: ['id', 'typeOfPiece', 'playerId', 'currentPos', 'isDead', 'updatedAt', 'gameId']
        });
    }

    catch(error) {
        throw error;
    }
}

export const create32Pieces = (player1Id, player2Id,gameId) => {
    await addNewPiece(0, 'R', player2Id, 0, 0, updatedAt, gameId)
    await addNewPiece(1, 'N', player2Id, 1, 0, updatedAt, gameId)
    await addNewPiece(2, 'B', player2Id, 2, 0, updatedAt, gameId)
    await addNewPiece(3, 'Q', player2Id, 3, 0, updatedAt, gameId)
    await addNewPiece(4, 'K', player2Id, 4, 0, updatedAt, gameId)
    await addNewPiece(5, 'B', player2Id, 5, 0, updatedAt, gameId)
    await addNewPiece(6, 'N', player2Id, 6, 0, updatedAt, gameId)
    await addNewPiece(7, 'R', player2Id, 7, 0, updatedAt, gameId)
    
    for (let i = 8, i< 16, i++) {
        await addNewPiece(i, 'P', player2Id, i, 0, updatedAt, gameId)
    }
   

}

squares[0] = new Rook(2);
  squares[7] = new Rook(2);
  squares[56] = new Rook(1);
  squares[63] = new Rook(1);

  squares[1] = new Knight(2);
  squares[6] = new Knight(2);
  squares[57] = new Knight(1);
  squares[62] = new Knight(1);

  squares[2] = new Bishop(2);
  squares[5] = new Bishop(2);
  squares[58] = new Bishop(1);
  squares[61] = new Bishop(1);

  squares[3] = new Queen(2);
  squares[4] = new King(2);

  squares[59] = new Queen(1);
  squares[60] = new King(1);
