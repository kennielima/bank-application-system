const { Sequelize } = require('sequelize');
require('dotenv').config()
const fs = require('fs');
const path = require('path');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DIALECT } = require('../../utils/config');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DIALECT
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
        // console.log('Found file:', file)
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
// console.log('Loaded models:', Object.keys(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;