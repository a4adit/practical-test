const Sequelize = require('sequelize')
const db = require('./_db')

const Categories = db.define('categories', {
  itemCategory: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  }
},
{
  timestamps: false
})
Categories.sync();

module.exports = Categories