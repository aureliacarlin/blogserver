let router = require('express').Router();
let Drafts = require('../db').import('../models/draft');
let validateSession = require('../middleware/validate-session');
// Drafts.sync({force: 'true'})

router.post('/new', validateSession, (req, res) => {
    Drafts.create({
        title: req.body.title,
        content: req.body.content,
        owner: req.user.id,
        author: req.user.userName
    }).then(
        createSuccess = (data) => {
            res.json({
                Draft: data,
                message: "Draft saved"
            })
        },
        createError = err => res.send(500, err.message)
    )
})

router.get('/getall', (req, res) => {
    Drafts.findAll()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err}))
})

router.put('/update/:id', validateSession, (req, res) => {
    if(!req.errors) {
        Drafts.update({
            title: req.body.title,
            content: req.body.content
        }, {where: {id: req.params.id}})
        .then(setting => res.status(200).json(setting))
        .catch(setting => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
})

router.delete('/delete/:id', function(req, res) {
    Drafts.destroy({
        where: {id: req.params.id}
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err}))
})

module.exports = router;