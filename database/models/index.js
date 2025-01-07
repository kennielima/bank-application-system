const { Sequelize } = require('sequelize');
require('dotenv').config()
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const basename = path.basename(__filename);
const db = {};
fs.readdirSync(__dirname)
    .filter(
        (file) =>
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
        console.log('Found file:', file)
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
console.log('Loaded models:', Object.keys(db));
console.log('Reading directory:', __dirname);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;