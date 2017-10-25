const db = require('../util/db/index.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
const operatorsAliases = {
  $in: Op.in
}

const storeController = {};

storeController.calculatePrice = function(body, res, next){
	var self = this;
	this.findUser(body.userId, (err, user) => {
		if(err || !user){
			error = new Error('Failed Get User');
			error.status = 403;
			error.code = 'ST0001';
			return next(error);
		}
		var userDiscount = self.getUserDiscount(user);
		var isAppliedDiscount = userDiscount !== 0;
		var items = {};
		for(var i = 0; i < body.items.length; i++){
			var item = body.items[i];
			items[item.itemId] = item.quantity;
		}
		self.findItems(items, (e, itemResult) => {
			if(e){
				error = new Error('Failed Get Item');
				error.status = 403;
				error.code = 'ST0002';
				return next(error);
			}
			var cartResult = self.calculateItemSubTotal(itemResult, userDiscount);
			var discount = self.getDiscountTotal(cartResult.totalPrice);
			cartResult.discount = discount;
			cartResult.totalDiscount += discount;
			cartResult.totalPrice = cartResult.totalPrice - discount;
			res.send(cartResult);
		})
	})
}

storeController.findUser = function(userId, callback){
	db.User.findOne({'where':{userId : userId}})
		.then((result) => {
			result = result || {};
      		callback(null, result.dataValues);
		}).catch((e) =>{
			callback(e);
		})
}

storeController.findItems = function(items, callback){
	var itemIds = Object.keys(items);
	db.Item.findAll({'where':{itemId : {$in:itemIds}}})
		.then((result) => {
			var data = [];
			result = result || {};
			result.forEach(function(itemData){
				var temp = itemData.get();
				temp.subTotal = (temp.price * items[temp.itemId]);
                data.push(temp);
            });
      		callback(null, data);
		}).catch((e) =>{
			callback(e);
		})
}

storeController.getUserDiscount = function(user){
	var discount = 0;
	var now = moment();
	if(user.userType === 2){
		// employee user
		discount = 20;
	}else if(user.userType === 1){
		// affiliate user
		discount = 15;
	}else if(now.diff(user.joinDate, 'years') >= 3){
		// user has 3 years member
		discount = 10;
	}
	return discount;
}

storeController.calculateItemSubTotal = function(items, discount){
	var total = 0, totalDiscount = 0;
	for(var i=0; i<items.length; i++){
		var item = items[i];
		if(item.itemCategory !== 1 && discount > 0){
			item.discount = Math.round((item.subTotal*100)*(discount/100))/100;
		}
		item.total = item.subTotal - (item.discount || 0);
		total += item.total;
		totalDiscount += item.discount || 0;
	}
	return {items : items, totalPrice:total, totalDiscount:totalDiscount};
}

storeController.getDiscountTotal = function(total){
	return Math.floor(total/100) * 5;
}

module.exports = storeController;
