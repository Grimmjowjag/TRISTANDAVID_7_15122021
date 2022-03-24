const sequelize = require("./DBconnect")
const { DataTypes } = require("sequelize")

// Création du schéma de données sequelize avec les champs requis (ceci va simplifier les opérations de lecture et d'écriture dans la base de données)
  const postModel = sequelize.define("post", {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'user',
        key:'id'
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likes: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    dislikes: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
  },
    {
      tableName: "posts",
      freezeTableName: true
    }
  )

  postModel.associate = function(models) {
    models.post.belongsTo(models.User, {onDelete: 'CASCADE'}),
    models.post.hasMany(models.reactionModel, {onDelete: 'CASCADE'})
    }

module.exports = postModel