const { Sequelize } = require("sequelize")
require('dotenv').config({ path:"../.env" })

// Paramètres de connection
const sequelize = new Sequelize( "sequelize-p7", process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host:"localhost",
    dialect:"mysql"
})

// authenticate va vérifier si la connection à la DB est ok, puis sync va synchroniser les modèles, sinon, le catch renvoie une erreur
sequelize.authenticate()
    .then(() => {
        console.log("Database connectée!")
        sequelize.sync({alter: true})
            .then( sync => {
                console.log("Modèles synchronisés!")
            })
            .catch(error => {
                console.log("Erreur de synchronisation des modèles!" + error)
            })
    }).catch(error => {
        console.log("Non connecté!" + error)
    })

module.exports = sequelize