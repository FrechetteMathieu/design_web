const express = require('express');
const router = express.Router();

const submitController = require('../controllers/examen2.controller');

router.post('/revB', submitController.RevB);

module.exports = router;