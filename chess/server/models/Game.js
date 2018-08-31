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
        type: Sequelize.STRING,
    },
    player2id: {
        type: Sequelize.STRING,
    },
    roomname: Sequelize.TEXT

}, { timestamps: false });

// Game.hasMany(Piece, { foreignKey: 'gameId', sourceKey: 'gameId' });
// Piece.belongsTo(Game, { foreignKey: 'gameId', targetKey: 'gameId' });


export const createNewGame = async (player1id, player2id) => {
    try {
        if (!player1id && !player2id) {
            return null;
        } 
        // console.log(player1);
        // console.log(player2);
        
        let newGame = await Game.create({
            player1id,
            player2id,
            roomname: player1id + "-" + player2id
        }, {
            fields: ['player1id', 'player2id', 'roomname']
        });
        return newGame;
    } catch (error) {
        // console.log(error);
        return null;
    }
}

export const getAvailableGames = async() => {
    try {
       
        
        let availableGames = await Game.findAll({
            attributes: ['id','player1id', 'player2id', 'roomname'],
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

export const updateGame = async ( newplayer1id, newplayer2id, newroomname) => {
    try {
        let updatedGame = await Game.findOne({
            where: {
                roomname
            }
        })

        await updatedGame.update({
            player1id: newplayer1id ? newplayer1id : updatedGame.player1id,
            player2id: newplayer2id ? newplayer2id : updatedGame.player2id,
            roomname: newroomname ? newroomname : updatedGame.roomname
            
        });
        return updatedGame;
    }
    catch(error) {
        throw error

    }
}

// export const getGameFromPlayers = async(player1id, player2id) => {
//     try {
//         let foundGame = await Game.findOne({
//             where: {
//                 player1id,
//                 player2id
//             }
//         })
//         return foundGame
//     }
//     catch(error) {
//         return null
//     }

// }