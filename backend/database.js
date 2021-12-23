const Sequelize = require('sequelize')
const { DataTypes, Op } = Sequelize // Clé qui nous permet d'accéder directement à DataTypes

const sequelize = new Sequelize('sequelize-p7', 'root', 'noobolife75z$', {
    dialect: 'mysql',
})

const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false, // allowNull oblige l'user à utiliser un nom compris entre 4 et 8 caractères
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

User.sync().then(() => {
    console.log('Model synced succesfully!')
    return User.bulkCreate([
        {
            username: 'Tristan',
            password: 'noobolife75z$',
            age: 25,
            Tristan: false
        },
        {
            username:'Adrien',
            password:'adrien1234',
            age: 30,
            enterprise_year: 8
        },
        {
            username:'Julie',
            password:'julie1234',
            age: 34,
            enterprise_year: 6
        },
        {
            username:'Hugues',
            password:'hugues1234',
            age: 29,
            enterprise_year: 2
        },
        {
            username:'Neorocks',
            password:'neorocks1234',
            age: 38,
            enterprise_year: 12
        },
        {
            username:'Trinity',
            password:'trinity1234',
            age: 36,
            enterprise_year: 7
        },
        {
            username:'Morpheus',
            password:'morpheus1234',
            age: 42,
            enterprise_year: 15
        },
        {
            username:'Galaad',
            password:'galaad1234',
            age: 26,
            enterprise_year: 1
        },
        {
            username:'Violette',
            password:'violette1234',
            age: 27,
            enterprise_year: 3
        },
        {
            username:'Robin',
            password:'robin1234',
            age: 31,
            enterprise_year: 5
        },
    ], {validate: true })
}).then((data) => {
    data.forEach((element) =>{
        console.log(element.toJSON())
    })
})
.catch((err) => {
    console.log(err)
})
