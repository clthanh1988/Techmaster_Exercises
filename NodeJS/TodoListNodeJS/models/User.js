// var q = require('q');

// var db = require('../databases/database');

// import {db} from '../databases/database';

import { sequelize, Op } from '../databases/database';
import Sequelize from 'sequelize';
//var conn = db.getConnection();

// function addUser(user) {
//     if(user) {
//         var defer = q.defer();

//         var query = conn.query('INSERT INTO users SET ?', user, function(err, result){
//             if(err) {
//                 defer.reject(err);
//             }
//             else {
//                 defer.resolve(result);
//             }
//         });

//         return defer.promise;
//     }

//     return false;
// }

export const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    email: Sequelize.TEXT,
    password: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING
    
  },

  {timestamps: false }
  // Không tự động thêm createdAt & updatedAt

)

// module.exports = {User} (Tùy trường hợp)

