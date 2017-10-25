const express = require('express');
const router = express.Router();
const storeController = require('../controller/StoreController');

/* route calculate total bill */
router.post('/checkout', function(req, res, next){
	var body = req.body;
	storeController.calculatePrice(body, res, next);
});
module.exports = router;
