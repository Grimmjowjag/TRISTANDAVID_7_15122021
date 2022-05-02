const sequelize = require("./DBconnect")
const { DataTypes } = require("sequelize")

const commentModel = sequelize.define("comment", {

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

commentModel.associate = function (models) {
  models.Comment.belongsTo(models.User);
  models.Comment.belongsTo(models.Post);
}

module.exports = commentModel