const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authentication = require('../../middleware/authentication')

router.all('*', authentication.verifyToken)

router.get('/', function(req, res) {
    res.json({
        message: 'oi'
    })
});

module.exports = router;