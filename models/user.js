module.exports = function (sequelize, DataTypes) {
    const userInfo = sequelize.define('user', {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return userInfo;
}