import { sequelize, Op } from '../databases/database';
import Sequelize from 'sequelize';

import Piece from './Piece';
import { findPlayerById, findAllPlayers } from './Player';

export const Game = sequelize.define('game', {
    gameId: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    player1Id: {        
        type: Sequelize.INTEGER,                 
    },
    player2Id: {        
        type: Sequelize.INTEGER,                 
    },
},
    {timestamps: true }
);

// Game.hasMany(Piece, { foreignKey: 'gameId', sourceKey: 'gameId' });
// Piece.belongsTo(Game, { foreignKey: 'gameId', targetKey: 'gameId' });


export const createNewGame = async (player1Id, player2Id) => {
    try {
        
        let player1 = await findPlayerById(player1Id);
        let player2 = await findPlayerById(player2Id);
        if (!player1 || !player2) {            
            return null;
        }
        let newGame = await Game.create({            
            player1Id,
            player2Id
        }, {
            fields: ['player1Id', 'player2Id']
        });
        return newGame;
    }
    
    catch(error) {
        return null;
    }
}

