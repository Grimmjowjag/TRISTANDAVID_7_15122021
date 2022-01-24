const { Sequelize } = require("sequelize")

// Paramètres de connection
const sequelize = new Sequelize( "sequelize-p7", "root", "noobolife75z$", {
    host:"localhost",
    dialect:"mysql"
})

sequelize.authenticate()
    .then(() => {
        console.log("Database connectée!")
        // { force: true }
        sequelize.sync()
            .then( sync => {
                console.log("Modèles synchronisés!")
            })
            .catch(error => {
                console.log("Erreur de synchronisation des modèles!" + error)
            })
    }).catch(error => {
        console.log("Non connecté!" + error)
    })

// Connection à la DataBase
module.exports = sequelize