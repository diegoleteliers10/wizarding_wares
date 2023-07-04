const { Router } = require('express');
const router = Router();
const { createOrder, receiveWebhook, getReceiveWebhook } = require('../controllers/payment.controller')

router.post('/create-order', createOrder)

router.post('/webhook', receiveWebhook)

router.get('/receiveWebhook', getReceiveWebhook)

module.exports = router;