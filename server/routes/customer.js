var express = require('express');
var router = express.Router();

const { ListCard, NewCustomer, UpdateCustomer } = require('../../services/customer')

router.get('/cards', ListCard)
router.post('/mantragem', NewCustomer)
router.put('/mantragem/:id', UpdateCustomer)

module.exports = router;