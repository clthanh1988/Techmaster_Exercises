import { sequelize, Op } from '../databases/database';
import Sequelize from 'sequelize';

import Piece from './Piece';
import { findPlayerById, findAllPlayers, findPlayerNameById } from './Player';

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
        if (!player1id || !player2id) {
            return null;
        } 
        // console.log(player1);
        // console.log(player2);
        let player1name = await findPlayerNameById(player1id);
        let player2name = await findPlayerNameById(player2id);
        let roomname = player1name + "-" + player2name

        let newGame = await Game.create({
            player1id,
            player2id,
            roomname
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

export const findNamesOfPlayersByRoomname = async(roomname) => {
    try {
        let thisRoom = await Game.findOne({
            where: {
                roomname
            }
        })
        let player1id = thisRoom.player1id;
        let player2id = thisRoom.player2id;
        let player1info = await findPlayerById(player1id);
        let player2info = await findPlayerById(player2id);
        let players = {player1name:{player1info}, player2name:{player2info}};
        return players;

    }
    catch(err) {
        throw err
    }

}

