import { sequelize, Op } from '../databases/database';
import Sequelize from 'sequelize';
import {Game} from './Game';

export const Player = sequelize.define('player', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,

    password: Sequelize.STRING,
    
    createdAt: {
        type: Sequelize.DATE,
        field: 'createdat'
    },

    updatedAt: {
        type: Sequelize.DATE,
        field: 'updatedat'
    } 
    
  },

  {timestamps: true }
);

Player.hasMany(Game, { foreignKey: 'player1Id', sourceKey: 'id' });
Player.hasMany(Game, { foreignKey: 'player2Id', sourceKey: 'id' });

Game.belongsTo(Player, { foreignKey: 'player1Id', targetKey: 'id' });
Game.belongsTo(Player, { foreignKey: 'player2Id', targetKey: 'id' });


export const insertPlayer = async (name, password) => {

    try {
        const insertedPlayer = await Player.create({
            name,
            password,
            createdAt,
            updatedAt
        },{
                fields: ["name", "password", 'createdAt', "updatedAt"]
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

export const findAllPlayers = async () => {
    try {
        var allPlayers = await Player.findAll({
            attributes:["id" ,"name", "password", "createdAt", "updatedAt"]            
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