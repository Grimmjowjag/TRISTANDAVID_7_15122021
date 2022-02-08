const Sequelize = require('sequelize')
const sequelize = require("./DBconnect")
const { DataTypes } = Sequelize // Clé qui nous permet d'accéder directement à DataTypes
// const bcrypt = require('bcrypt')

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'email'
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false, // allowNull oblige l'user à utiliser un nom compris entre 4 et 10 caractères
        validate: {
            len: [4,10]
        }
    },
    password: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    enterprise_year: {
        type: DataTypes.INTEGER
    },
    Tristan: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    freezeTableName: true, // empêche la pluralisation de mySQL Workbench
    timestamps: false
})

module.exports = User

// User.sync().then(() => {
//     console.log('Model synced succesfully!')
    
//     bcrypt.hash('Noobolife75z$', 10)
//     .then(hash => {
//       console.log(hash)
//       let password = null
//       password = hash

//       return User.bulkCreate([
//         {
//             username: 'Tristan',
//             password: password,
//             age: 25,
//             Tristan: false
//         },
//         {
//             username:'Adrien',
//             password: password,
//             age: 30,
//             enterprise_year: 8
//         },
//         {
//             username:'Julie',
//             password: password,
//             age: 34,
//             enterprise_year: 6
//         },
//           ], {validate: true })
//             }).then((data) => {
//                 data.forEach((element) =>{
//                     console.log(element.toJSON())
//                 })
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
// })

