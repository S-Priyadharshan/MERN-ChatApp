const express = require('express');
const {sendMessage,getMessage} = require('../controllers/message.controller');
const protectRoute = require('../middlewares/protectRoute.js');

const router = express.Router();

router.post('/send/:id',protectRoute,sendMessage);
router.get('/:id',protectRoute,getMessage);

module.exports = router;
