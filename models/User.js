const {DataTypes} = require('sequelize');
const db = require('../db/conn');

 
const User = db.define('Users',{
    name:{
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    login:{
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    }
})


module.exports = User