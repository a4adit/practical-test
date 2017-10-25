const Sequelize = require('sequelize')
const db = require('./_db')

const Item = db.define('item', {
  itemId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  itemName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  itemCategory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
},
{
  underscored: true,
  timestamps: false
})
Item.sync();
module.exports = Item