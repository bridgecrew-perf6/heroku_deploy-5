const express = require('express');
const users = require("./users.routes");
const login = require("./login.routes");

const router = express.Router();

router.use('/users', users);
router.use('/login', login);

module.exports = router;