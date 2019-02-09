const Sequelize = require('sequelize');
const sequelize = new Sequelize('blogsite', 'postgres', 'F!ghtS0ng', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to blogsite postgres database');
    },
    function(err){
        console.log(err)
    }
);

module.exports = sequelize;