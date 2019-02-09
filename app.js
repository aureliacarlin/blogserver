require('dotenv').config();

let express = require('express');
let app = express();
let sequelize = require('./db');

let user = require('./controllers/usercontroller');
let draft = require('./controllers/draftcontroller');
let blog = require('./controllers/blogcontroller');

const bodyParser = require('body-parser');

sequelize.sync();

app.use(require('./middleware/headers'));

app.use(bodyParser.json());

app.listen(4000, function() {
    console.log('App is listening on 4000')
})

app.use('/user', user)
app.use('/draft', draft)
app.use('/blog', blog)
