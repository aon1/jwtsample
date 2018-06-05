const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const config = require('../../config/config')

router.post('/signup', function(req, res) {
    bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new User({
                _id: new  mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash    
            });
            user.save().then(function(result) {
                var token = jwt.sign({ id: user._id }, config.SECRET_KEY, {
                    expiresIn: 86400 // expires in 24 hours
                });

                res.status(200).json({
                    success: 'New user has been created',
                    token: token
                });
            }).catch(error => {
                res.status(500).json({
                    error: err
                });
            });
        }
    });
});

router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) 
            return res.status(500).send('Error on the server.');
      
        if (!user) 
            return res.status(404).send('No user found.');
  
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        
        if (!passwordIsValid) 
            return res.status(401).send({ auth: false, token: null });
  
        var token = jwt.sign({ id: user._id }, config.SECRET_KEY, {
            expiresIn: 86400 // expires in 24 hours
        });
  
        res.status(200).send({ 
            auth: true, 
            token: token 
        });
    });
});

module.exports = router;