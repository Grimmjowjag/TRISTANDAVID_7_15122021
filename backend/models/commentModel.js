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
    // postId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references:{
    //       mode:'post',
    //       key:'id'
    //     }
    // },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
    {
      sequelize,
      freezeTableName: true,
      tableName: "comments",
    }
  )

  module.exports = commentModel