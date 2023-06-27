const { Router } = require('express');
const router = Router();
const { createOrder, success, failure, receiveWebhook } = require('../controllers/payment.controller')

router.post('/create-order', createOrder)

router.get('/success', success)

router.get('/failure', failure)

router.post('/webhook', receiveWebhook)

module.exports = router;