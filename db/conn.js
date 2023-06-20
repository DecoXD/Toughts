const {Sequelize} = require('sequelize');
const db = new Sequelize('toughts','root','',{
    dialect: 'mysql',
    host: 'localhost'
})

try { 
    db.authenticate().then(() => {
        console.log('conectado')
    })
} catch (error) {
    console.log('nao conectou',error)
}

module.exports = db
