const Sequelize = require('sequelize')
const db = new Sequelize('mysql://root:Welcome123@127.0.0.1:3306/store')
module.exports = db