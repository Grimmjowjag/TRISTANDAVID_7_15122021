const sequelize = require("./DBconnect")
const { DataTypes } = require("sequelize")

const commentModel = sequelize.define("comment", {
    
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
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
    {
      sequelize,
      freezeTableName: true,
      tableName: "comments",
    },

  )

commentModel.associate = function(models) {
  models.comment.belongsTo(models.User, {onDelete: 'CASCADE'}),
  models.comment.belongsTo(models.postModel, {onDelete: 'CASCADE'})
  }

module.exports = commentModel