const Sequelize = require('sequelize')
const { DataTypes, Op } = Sequelize // Clé qui nous permet d'accéder directement à DataTypes

const sequelize = new Sequelize('sequelize-p7', 'root', 'noobolife75z$', {
    dialect: 'mysql',
})

const Student = sequelize.define('student', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4,20]
        }
    },
    favorite_class: {
        type: DataTypes.STRING(25),
        defaultValue: 'Computer Science',
    },
    school_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subscribe_to_Tristan: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timesstamps: false
})

Student.sync().then(() => {
    console.log("Model synced successfully!")
    return Student.findAll({ 
       attributes: [
           'school_year',
           [sequelize.fn('COUNT', sequelize.col('school_year')), 'num_students']
        ],
       group:'school_year'
}).then((data) => {
    data.forEach((element) => {
        console.log(element.toJSON())
    })
})
}).catch((err) => {
    console.log(err)
})