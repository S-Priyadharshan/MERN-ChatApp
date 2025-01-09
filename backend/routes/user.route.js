const express = require('express');
const protectRoute = require('../middlewares/protectRoute.js');
const {getAllUsers} = require('../controllers/user.controller');

const router = express.Router();

router.get("/",protectRoute,getAllUsers);

module.exports = router;