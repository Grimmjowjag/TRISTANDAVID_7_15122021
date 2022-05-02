const sequelize = require("./DBconnect")
const { DataTypes } = require("sequelize")

const reactionModel = sequelize.define("reaction", {

    // Prévient du infinit like
    // isLike: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
  },
    {
      sequelize,
      freezeTableName: true,
      tableName: "reactions",
    }
  )

reactionModel.associate = function(models) {
  models.Reaction.belongsTo(models.User);
  models.Reaction.belongsTo(models.Post);
  }

  module.exports = reactionModel

