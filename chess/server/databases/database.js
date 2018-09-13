import Sequelize from 'sequelize';
export const sequelize = new Sequelize('chess', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
export const Op = Sequelize.Op;