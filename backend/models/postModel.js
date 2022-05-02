const sequelize = require("./DBconnect")
const { DataTypes } = require("sequelize")

// Création du schéma de données sequelize avec les champs requis (ceci va simplifier les opérations de lecture et d'écriture dans la base de données)
  const postModel = sequelize.define("post", {

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
  },
    {
      tableName: "posts",
      freezeTableName: true
    }
  )

  postModel.associate = function(models) {
    models.Post.belongsTo(models.User);
    models.Post.hasMany(models.Reaction, {onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    models.Post.hasMany(models.Comment, {onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }

module.exports = postModel