import { sequelize, Op } from '../databases/database';
import Sequelize from 'sequelize';

import Piece from './Piece';
import { findPlayerById, findAllPlayers } from './Player';

export const Game = sequelize.define('game', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    player1id: {
        type: Sequelize.INTEGER,
    },
    player2id: {
        type: Sequelize.INTEGER,
    },
    description: Sequelize.TEXT

}, { timestamps: false });

// Game.hasMany(Piece, { foreignKey: 'gameId', sourceKey: 'gameId' });
// Piece.belongsTo(Game, { foreignKey: 'gameId', targetKey: 'gameId' });


export const createNewGame = async (player1id, player2id, description) => {
    try {
        if (player1id < 0 && player2id < 0) {
            return null;
        } 
        // console.log(player1);
        // console.log(player2);
        let newGame = await Game.create({
            player1id,
            player2id,
            description
        }, {
            fields: ['player1id', 'player2id', 'description']
        });
        return newGame;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAvailableGames = async() => {
    try {
       
        
        let availableGames = await Game.findAll({
            attributes: ['id','player1id', 'player2id', 'description'],
            where: {
                [Op.or]: [{player1id: -1}, {player2id: -1}]
                
            }
            // ,
            // offset: pageNumber * 10,
            // limit: 10
        })


        if(!availableGames) {
            return {}
        }
        else {
            
            return availableGames
        }
    }
    catch(error) {
        throw error
    }


}

export const updateGame = async (id, newplayer1id, newplayer2id, newdescription) => {
    try {
        let updatedGame = await Game.findById(id)

        await updatedGame.update({
            player1id: newplayer1id ? newplayer1id : updatedGame.player1id,
            player2id: newplayer2id ? newplayer2id : updatedGame.player2id,
            description: newdescription ? newdescription : updatedGame.description
            
        });
        return updatedGame;
    }
    catch(error) {
        throw error

    }
}