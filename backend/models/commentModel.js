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
      allowNull: false
    },
    // postId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
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
      tableName: "comments",
    }
  )

  module.exports = commentModel