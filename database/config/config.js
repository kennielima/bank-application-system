const dotenv = require('dotenv');
dotenv.config();
const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DIALECT } = require('../../utils/config');

module.exports = {
    "development": {
        "username": DB_USER,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": DB_HOST,
        "port": DB_PORT,
        "dialect": DIALECT
    },
    "test": {
        "username": DB_USER,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": DB_HOST,
        "dialect": DIALECT
    },
    "production": {
        "username": DB_USER,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": DB_HOST,
        "dialect": DIALECT
    }
}
