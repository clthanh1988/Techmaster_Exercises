import { sequelize, Op } from '../databases/database';
import Sequelize from 'sequelize';
import { Game} from './Game';

export const Player = sequelize.define('player', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.TEXT,
    password: Sequelize.TEXT,        
  },
  {timestamps: false }
);
/*
Player.hasMany(Game, { foreignKey: 'player1Id', sourceKey: 'id' });
Player.hasMany(Game, { foreignKey: 'player2Id', sourceKey: 'id' });

Game.belongsTo(Player, { foreignKey: 'player1Id', targetKey: 'id' });
Game.belongsTo(Player, { foreignKey: 'player2Id', targetKey: 'id' });
*/

export const insertPlayer = async (name, password) => {

    try {
        const insertedPlayer = await Player.create({
            name,
            password
        },{
                fields: ["name", "password"]
        });
        return insertedPlayer ? insertedPlayer : {}
    
    }
    catch(error) {
        throw error;
    }
}

export const findPlayerById = async (id) => {
    try {
        var player = await Player.findById(id);
        if (!player) {
            return null;
        }
        else {
            return player.dataValues;
        }
    }

    catch(error) {
        throw error;
    }
}
export const loginPlayer = async (name, password) => {
    try {        
        var allPlayers = await Player.findAll({
            attributes:["id" ,"name", "password"],
            where: {
                name,password
            }            
          });

        if (allPlayers.length > 0) {
            return allPlayers[0];
        }
        else {
            return null;
        }
    }

    catch(error) {
        throw error;
    }
}    




export const findAllPlayers = async () => {
    try {
        var allPlayers = await Player.findAll({
            attributes:["id" ,"name", "password"]            
          });
        if (!allPlayers) {
            throw error
        }
        else {
            return allPlayers;
        }
    }

    catch(error) {
        throw error;
    }
}