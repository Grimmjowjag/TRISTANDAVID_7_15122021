const Sequelize = require('sequelize')
const sequelize = require("./DBconnect")
const { DataTypes } = Sequelize

const User = sequelize.define('user', {

    // Par défaut, null est une valeur autorisée pour chaque colonne d'un modèle. 
    // Cela peut être désactivé en définissant l'option allowNull: false pour une colonne
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { 
            notNull:{msg: 'Vous devez entrer un mot de passe' },
            notEmpty:{msg: 'Votre mot de passe ne doit pas être vide' }
        }
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
},
    {
        freezeTableName: true, // empêche la pluralisation de mySQL Workbench
        tableName: "users"
    }
)

User.associate = function(models) {
    models.User.hasMany(models.Comment, {onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    models.User.hasMany(models.Post, {onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    models.User.hasMany(models.Reaction, {onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
    
module.exports = User


