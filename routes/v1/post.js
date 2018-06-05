const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const config = require('../../config/config')

router.use(function(req, res, next) {
    var token = req.body.token || req.headers['token'];

    if(token) {
        jwt.verify(token, config.SECRET_KEY, function(err, decode) {
            if(err) {
                res.status(403).send('invalid token');
            } else {
                next();
            }
        })
    } else {
        res.send('please send a token');
    }
});

router.get('/', function(req, res) {
    res.json({
        message: 'oi'
    })
});

module.exports = router;