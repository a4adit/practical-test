const Sequelize = require('sequelize')
const db = require('./_db')

const User = db.define('user', {
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  userType: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  joinDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
},
{
  underscored: true,
  timestamps: false
})
User.sync();
module.exports = User