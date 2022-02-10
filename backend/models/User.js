const Sequelize = require('sequelize')
const sequelize = require("./DBconnect")
const { DataTypes } = Sequelize // Clé qui nous permet d'accéder directement à DataTypes
// const bcrypt = require('bcrypt')

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'email',
        validate: { 
            notNull:{msg: 'Vous devez entrer un email' },
            notEmpty:{msg: 'Votre email ne doit pas être vide' }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate oblige l'user à utiliser un nom compris entre 4 et 10 caractères, entrer un nom et ne pas entrer un nom vide
        validate: { 
            notNull:{msg: 'Vous devez entrer un nom' },
            notEmpty:{msg: 'Votre nom ne doit pas être vide' },
            len: [4,10]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { 
            notNull:{msg: 'Vous devez entrer un mot de passe' },
            notEmpty:{msg: 'Votre mot de passe ne doit pas être vide' }
        }
    },
    // role: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    age: {
        type: DataTypes.INTEGER
    },
    enterprise_year: {
        type: DataTypes.INTEGER
    },
    Tristan: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    freezeTableName: true, // empêche la pluralisation de mySQL Workbench
    timestamps: false
})

module.exports = User


