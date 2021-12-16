const Sequelize = require('sequelize')

const sequelize = new Sequelize('sequelize-p7', 'root', 'noobolife75z$', {
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log("Connection succesful!")
}).catch((err) => {
    console.log("Error connecting to database!")
})

console.log("Another task.")
