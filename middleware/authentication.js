const jwt = require('jsonwebtoken');
const config = require('../config/config')

module.exports = { 
    verifyToken: function(req, res, next) {
        var token = req.body.token || req.headers['token'];

        if(token) {
            jwt.verify(token, config.SECRET_KEY, function(err, decode) {
                if(err) {
                    res.status(403).send('invalid token');
                } else {
                    next();
                }
            });
        } else {
            res.send('please send a token');
        }
    }
}
