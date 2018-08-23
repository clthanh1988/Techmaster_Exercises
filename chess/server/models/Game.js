import { sequelize, Op } from '../databases/database';
import Sequelize from 'sequelize';

import Piece from './Piece';
import { findPlayerById, findAllPlayers } from './Player';

export const Game = sequelize.define('game', {
    gameid: {
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


export const createNewGame = async (player1Id, player2Id) => {
    try {

        let player1 = await findPlayerById(player1Id);
        let player2 = await findPlayerById(player2Id);


        if (!player1 || !player2) {
            return null;
        }
        // console.log(player1);
        // console.log(player2);
        let newGame = await Game.create({
            player1id: player1Id,
            player2id: player2Id
        }, {
            fields: ['player1id', 'player2id']
        });
        return newGame;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAvailableGames = async() => {



} 