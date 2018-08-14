import { sequelize, Op } from '../databases/database';
import Sequelize from 'sequelize';

import Piece from './Pieces';
import { findPlayerById, findAllPlayers } from './Players';

export const Game = sequelize.define('game', {
    gameId: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    player1Id: {
        
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
        
        
    },
    player2Id: {
        id: {
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        side: Sequelize.STRING
    }
},
    {timestamps: true }
);

Game.hasMany(Piece, { foreignKey: 'gameId', sourceKey: 'gameId' });


Piece.belongsTo(Game, { foreignKey: 'gameId', targetKey: 'gameId' });


// CREATE TABLE IF NOT EXISTS games(
//     gameId integer, 
//     player1Id integer,
//     player2Id integer,
//     createdAt date
    
// );

export const createNewGame = async (player1Id, player2Id) => {
    try {
        
        await findPlayerById(player1Id);
        await findPlayerById(player2Id);
        
        await Game.create({
            
            player1Id,
            player2Id
        }, {
            fields: ['player1Id', 'player2Id']
        });
    }
    
    catch(error) {
        throw error;
    }
}