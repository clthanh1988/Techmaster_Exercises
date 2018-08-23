import { sequelize, Op } from '../databases/database';
import Sequelize from 'sequelize';
import { Game } from './Game';

import {
  isEmpty,toDate, isURL, isEmail
} from 'validator';

export const Player = sequelize.define('player', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: Sequelize.TEXT,
    name: Sequelize.TEXT,
    password: Sequelize.TEXT,
    isplaying: Sequelize.INTEGER,
    tokenkey: Sequelize.TEXT
    


}, { timestamps: false });
/*
Player.hasMany(Game, { foreignKey: 'player1Id', sourceKey: 'id' });
Player.hasMany(Game, { foreignKey: 'player2Id', sourceKey: 'id' });

Game.belongsTo(Player, { foreignKey: 'player1Id', targetKey: 'id' });
Game.belongsTo(Player, { foreignKey: 'player2Id', targetKey: 'id' });
*/

export const insertPlayer = async (email, password, name, isplaying, tokenkey) => {

    try {
        let insertedPlayer = await Player.create({
            
            email,
            password,
            name,
            isplaying,
            tokenkey
        }, {
            fields: ["email", "password", 'name', 'isplaying', 'tokenkey']
        });
        

        return insertedPlayer ? insertedPlayer : {}

    } catch (error) {
        throw error;
    }
}

export const findPlayerById = async(id) => {
    try {
        var player = await Player.findById(id);
        if (!player) {
            return null;
        } else {
            return player.dataValues;
        }
    } catch (error) {
        throw error;
    }
}
export const loginPlayer = async(email, password) => {
    try {
        var allPlayers = await Player.findAll({
            attributes: ["id", "email", "password"],
            where: {
                email,
                password
            }
        });

        if (allPlayers.length > 0) {
            return allPlayers[0];
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}




export const findAllPlayers = async() => {
    try {
        var allPlayers = await Player.findAll({
            attributes: ["id", "email", "password"]
        });
        if (!allPlayers) {
            throw error
        } else {
            return allPlayers;
        }
    } catch (error) {
        throw error;
    }
}

export const getAvailablePlayers = async() => {
    let onlinePlayers = await Player.findAll({ limit: 10 },{
        attributes: ["id", "email", "password"],
        where: {
            isplaying: 0 // 0
        }
    });

    if(!onlinePlayers) {
        return {}
    }
    else {
        return onlinePlayers
    }

}

export const updatePlayer = async(id, newIsplaying, newName, newPassword, newTokenkey) => {
    try {
        var thisPlayer = await Player.findOne({
            attributes: ['email', 'name', 'password', 'isplaying', 'tokenkey'],
            where: {
                id:id
            }
        });
        await thisPlayer.update({
            isplaying: newIsplaying ? newIsplaying : isplaying,
            name: newName ? newName : isplaying,
            password: newPassword ? newPassword : password,
            tokenkey: newTokenkey ? newTokenkey : tokenkey
            
        });
        return thisPlayer;

    } catch (error) {
        throw error;
    }
    

}