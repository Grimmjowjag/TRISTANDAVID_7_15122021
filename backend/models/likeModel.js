// const sequelize = require("./DBconnect")
// const { DataTypes } = require("sequelize")

// const likeModel = sequelize.define("like", {

//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     user_id: { 
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       model:'user',
//       key:'id'
//     },
//     postId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       model:'post',
//       key:'id'
//     },
//   },
//     {
//       sequelize,
//       freezeTableName: true,
//       tableName: "like",
//     }
//   )

//   module.exports = likeModel

// Utiliser méthode ***.***belongsTo({***.***,onDelete:'CASCADE'})