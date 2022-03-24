const sequelize = require("./DBconnect")
const { DataTypes } = require("sequelize")

const reactionModel = sequelize.define("like", {

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
    postId: {
      type: DataTypes.STRING,
      allowNull: false,
      model:'posts',
      key:'id'
    },
    // Prévient du infinit like
    // isLike: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
  },
    {
      sequelize,
      freezeTableName: true,
      tableName: "like",
    }
  )

reactionModel.associate = function(models) {
  models.like.belongsTo(models.User, {onDelete: 'CASCADE'}),
  models.like.belongsTo(models.postModel, {onDelete: 'CASCADE'})
  }

  module.exports = reactionModel

