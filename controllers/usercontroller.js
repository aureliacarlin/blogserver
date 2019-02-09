let router = require('express').Router();
let User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let validateSession = require('../middleware/validate-session');

router.post('/signup', (req, res) => {
    User.create({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 10 * 0 * 0
            } )
            res.json({
                user: user,
                message: "User: created",
                sessionToken: token
            })
        },
        createError = err => res.send(500, err.message)
    )
})

router.post('/signin', (req, res) => {
    User.findOne({where: {userEmail: req.body.userEmail}})
    .then(
        user => {
            if(user){
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                    if(matches){
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
                            expiresIn: 60 * 60 * 24
                        })
                        res.json({
                            user: user,
                            message: "Successfully authenticated",
                            sessionToken: token
                        })
                    } else {
                        res.status(502).send({error: 'bad gateway'})
                    }
                })
            } else {
                res.status(502).send({error: "Failed to authenticate"})
            }
        },
        err => res.status(501).send({error: "Failed to process"})
    )
})

module.exports = router;