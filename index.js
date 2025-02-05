const server = require('./server')

const db = require('./database/models');
const logger = require('./utils/logger');
const { PORT } = require('./utils/config');
db.sequelize.sync({ alter: true, logging: console.log })
    .then(() => {
        logger.info('DATABASE CONNECTED SUCCESSFULLY')
    })
    .catch((error) => {
        logger.error('ERRORING CONNECTING TO DATABASE' + error)
    });

server.listen(PORT, () => {
    logger.info(`server running on port ${PORT}`)
})