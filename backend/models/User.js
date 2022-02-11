const Sequelize = require('sequelize')
const sequelize = require("./DBconnect")
const { DataTypes } = Sequelize

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
        // validate oblige l'user à utiliser un nom compris entre 4 et 10 caractères et a pas entrer un nom vide
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
    role: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
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
    }
)

User.associate = function(models) {
    models.user.hasMany(models.commentModel, {onDelete: 'CASCADE'}),
    models.user.hasMany(models.postModel, {onDelete: 'CASCADE'})
    }
    
module.exports = User


