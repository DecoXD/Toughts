const {DataTypes} = require('sequelize');
const db = require('../db/conn');
const User = require('./User');


const Tought = db.define('Toughts',{
    title:{
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    author:{
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    }
})

Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = Tought