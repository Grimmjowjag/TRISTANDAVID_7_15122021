const sequelize = require("./DBconnect")
const { DataTypes } = require("sequelize")

// Création du schéma de données avec les champs requis (ceci va simplifier les opérations de lecture et d'écriture dans la base de données)
  const postModel = sequelize.define("post", {

    user_id: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username: {
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
    }
  )

  module.exports = postModel