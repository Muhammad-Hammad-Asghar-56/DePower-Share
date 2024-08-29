const express = require('express');
const router = express.Router();
const {registerUser,addHouse,depositUnits,getUserByWallet,findHouse} = require("../Controllers/User");

// Register a new user
router.post('/register',registerUser);
router.post('/house/:walletAddress/',findHouse);

// Add a new house for a user
router.post('/add-house',addHouse);
router.post('/deposit-units',depositUnits);
router.get('/user/:walletAddress',getUserByWallet);

module.exports = router
