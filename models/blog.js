module.exports = function (sequelize, DataTypes) {
    const posts = sequelize.define('post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return posts
}