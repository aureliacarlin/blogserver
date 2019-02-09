module.exports = function (sequelize, DataTypes) {
    const draft = sequelize.define('sites', {
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
    return draft
}