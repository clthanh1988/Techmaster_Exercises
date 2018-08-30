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
    online: Sequelize.INTEGER
    


}, { timestamps: false });
/*
Player.hasMany(Game, { foreignKey: 'player1Id', sourceKey: 'id' });
Player.hasMany(Game, { foreignKey: 'player2Id', sourceKey: 'id' });

Game.belongsTo(Player, { foreignKey: 'player1Id', targetKey: 'id' });
Game.belongsTo(Player, { foreignKey: 'player2Id', targetKey: 'id' });
*/

export const insertPlayer = async (email, password, name, isplaying, online) => {

    try {
        let checkPlayerName = await Player.findOne({
            where: {
                name
            }
            
        }) 
        if (!checkPlayerName) {
            let insertedPlayer = await Player.create({
            
                email,
                password,
                name,
                isplaying,
                online
            }, {
                fields: ["email", "password", 'name', 'isplaying', 'online']
            });
            
    
            return insertedPlayer ? insertedPlayer : {}
        }
        else {
            return null;
        }

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
            attributes: ["id", "email", "password", 'name'],
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
    try {
        
        let onlinePlayers = await Player.findAll({
            attributes: ["id", 'name',"email", "password", 'isplaying', 'online'],
            where: {
                isplaying: 0,
                online: 1
            }
            // ,
            // offset: pageNumber * 10,
            // limit: 10
        })


        if(onlinePlayers.length < 0) {
            return {}
        }
        else {
            
            return onlinePlayers
        }
    }
    catch(error) {
        throw error
    }
}

export const updatePlayer = async(id, newIsplaying, newName, newPassword, newonline) => {
    try {
        let thisPlayer = await Player.findById(id);

        // Phải có thisPlayer để gán giá trị
        
        await thisPlayer.update({
            isplaying: newIsplaying ? newIsplaying : thisPlayer.isplaying,
            name: newName ? newName : thisPlayer.name,
            password: newPassword ? newPassword : thisPlayer.password,
            online: newonline ? newonline : thisPlayer.online
            
        });
        return thisPlayer;

    } catch (error) {
        throw error;
    }
    

}