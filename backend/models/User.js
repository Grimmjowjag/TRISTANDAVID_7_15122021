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
        timestamps: false
    }
)

User.associate = function(models) {
    models.user.hasMany(models.commentModel, {onDelete: 'CASCADE'}),
    models.user.hasMany(models.postModel, {onDelete: 'CASCADE'}),
    models.user.hasMany(models.reactionModel, {onDelete: 'CASCADE'})
    }
    
module.exports = User


