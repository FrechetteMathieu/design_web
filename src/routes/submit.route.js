const express = require('express');
const router = express.Router();

const submitController = require('../controllers/submit.controller');

router.post('/', submitController.submit);
router.get('/', submitController.submit);

router.post('/ex2-revB', submitController.ex2RevB);

module.exports = router;