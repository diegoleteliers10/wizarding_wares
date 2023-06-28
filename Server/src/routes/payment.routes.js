const { Router } = require('express');
const router = Router();
const { createOrder, receiveWebhook } = require('../controllers/payment.controller')

router.post('/create-order', createOrder)

router.post('/webhook', receiveWebhook)

module.exports = router;