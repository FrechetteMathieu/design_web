const express = require('express');
const router = express.Router();

const submitController = require('../controllers/submit.controller');

router.post('/', submitController.submit);
router.get('/', submitController.submit);

module.exports = router;