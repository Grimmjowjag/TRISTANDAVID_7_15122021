const Sequelize = require('sequelize')

const sequelize = new Sequelize('sequelize-p7', 'root', 'noobolife75z$', {
    dialect: 'mysql',
})

const User = sequelize.define('user', {
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false // allowNull oblige l'user à utiliser un nom
    },
    password: {
        type: Sequelize.DataTypes.STRING
    },
    age: {
        type: Sequelize.DataTypes.INTEGER
    },
    WiitCodeRoks: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    freezeTableName: true, // empêche la pluralisation de mySQL Workbench
    timestamps: false  
})

console.log(sequelize.models.user)
