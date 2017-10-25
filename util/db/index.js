const User = require('./user')
const Item = require('./item')
const Categories = require('./categories')

Item.belongsTo(Categories, {foreignKey: 'itemCategory'})

module.exports = {User, Item}