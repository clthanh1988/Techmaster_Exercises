import {
    sequelize,
    Op
} from '../databases/database';
import Sequelize from 'sequelize';
import {
    Game
} from './Game';

import {
    isEmpty,
    toDate,
    isURL,
    isEmail
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
    online: Sequelize.INTEGER,
    roomname: Sequelize.TEXT,
    socketid: Sequelize.TEXT



}, {
    timestamps: false
});
/*
Player.hasMany(Game, { foreignKey: 'player1Id', sourceKey: 'id' });
Player.hasMany(Game, { foreignKey: 'player2Id', sourceKey: 'id' });

Game.belongsTo(Player, { foreignKey: 'player1Id', targetKey: 'id' });
Game.belongsTo(Player, { foreignKey: 'player2Id', targetKey: 'id' });
*/

export const insertPlayer = async (email, password, name, isplaying, online, roomname) => {

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
                online,
                roomname

            }, {
                fields: ["email", "password", 'name', 'isplaying', 'online', 'roomname']
            });


            return insertedPlayer ? insertedPlayer : {}
        } else {
            return null;
        }

    } catch (error) {
        throw error;
    }
}

export const findPlayerNameById = async (id) => {
    try {
        let player = await Player.findById(id);
        if (!player) {
            return null;
        } else {
            return player.name;
        }
    } catch (error) {
        throw error;
    }
}


export const findPlayerById = async (id) => {
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

export const loginPlayer = async (data) => {
    // console.log(data)
    const {userName,password, socketid} = data
    try {
        // console.log(`email: ${email}`);
        // console.log(`password: ${password}`);
        // console.log(`socketid: ${socketid}`);
        const updateSocket = await Player.update({
            socketid
        }, {
            where: {
                email: userName
            }
        })
        var allPlayers = await Player.findAll({
            attributes: ["id", "email", "password", 'name', 'online', 'roomname', 'socketid'],
            where: {
                email: userName,
                password
            }
        });
        // console.log(updateSocket)
        console.log(`allPlayers = ${allPlayers}`)

        if (allPlayers.length > 0) {
            return allPlayers[0];
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

export const logoutPlayer = async (data) => {
    // console.log(data)
    const {userName, socketid} = data
    try {
        // console.log(`email: ${email}`);
        // console.log(`password: ${password}`);
        // console.log(`socketid: ${socketid}`);
        const updateSocket = await Player.update({
            socketid
        }, {
            where: {
                userName
            }
        })
        let thisPlayer = await Player.findOne({
            attributes: ["id", "email", "password", 'name', 'online', 'roomname', 'socketid'],
            where: {
                userName,
                
            }
        });
        // console.log(updateSocket)
        // console.log(`allPlayers = ${allPlayers}`)

        if (thisPlayer) {
            return thisPlayer;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}


export const findAllPlayers = async () => {
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

export const getAvailablePlayers = async () => {
    try {

        let onlinePlayers = await Player.findAll({
            attributes: ["id", 'name', "email", "password", 'isplaying', 'online', 'roomname', 'socketid'],
            where: {
                isplaying: 0,
                online: 1
            }
            // ,
            // offset: pageNumber * 10,
            // limit: 10
        })


        if (onlinePlayers.length < 0) {
            return {}
        } else {

            return onlinePlayers
        }
    } catch (error) {
        throw error
    }
}

export const findInfoByPlayer = async(name) => {
    try {
        let foundInfo = await Player.findOne({
            where: {
                name
            }
        })
        // console.log(foundInfo);
        return foundInfo;
    }
    catch(error) {
        throw error
    }


}

export const updatePlayer = async (id, newIsplaying, newName, newPassword, newonline, newroomname, newsocketid) => {
    try {
        let thisPlayer = await Player.findById(id);
        // console.log(`id = ${id}`);
        // console.log(thisPlayer);

        // Phải có thisPlayer để gán giá trị

        await thisPlayer.update({
            isplaying: newIsplaying ? newIsplaying : thisPlayer.isplaying,
            name: newName ? newName : thisPlayer.name,
            password: newPassword ? newPassword : thisPlayer.password,
            online: newonline ? newonline : thisPlayer.online,
            roomname: newroomname ? newroomname : thisPlayer.roomname,
            socketid: newsocketid ? newsocketid : thisPlayer.socketid
        });
        return thisPlayer;

    } catch (error) {
        throw error;
    }


}