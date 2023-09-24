const express = require('express');
const { register, login } = require('../Controllers/auth.js');

const router = express.Router();

// post get update delete

router.post('/register', register)
router.post('/login', login)

module.exports = router;