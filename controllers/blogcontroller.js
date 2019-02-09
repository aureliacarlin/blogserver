let router = require('express').Router();
let Blogs = require('../db').import('../models/blog');
let validateSession = require('../middleware/validate-session');
// Blogs.sync({force: 'true'})

router.post('/new', validateSession, (req, res) => {
    Blogs.create({
        title: req.body.title,
        content: req.body.content,
        owner: req.user.id,
        author: req.user.userName
    }).then(
        createSuccess = (data) => {
            res.json({
                Post: data,
                message: 'Posted!'
            })
        },
        createError = err => res.send(500, err.message)
    )
})

router.get('/getall', (req, res) => {
    Blogs.findAll()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err}))
})

router.delete('/delete/:id', function(req, res) {
    Blogs.destroy({
        where: {id: req.params.id}
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err}))
})

module.exports = router;