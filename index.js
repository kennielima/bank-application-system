const server = require('./server')

const db = require('./database/models');
const logger = require('./utils/logger');
db.sequelize.sync({ alter: true })
    .then(() => {
        logger.info('DATABASE CONNECTED SUCCESSFULLY')
    })
    .catch((error) => {
        logger.error('ERRORING CONNECTING TO DATABASE' + error)
    });

server.listen(process.env.PORT, () => {
    logger.info(`server running on port ${process.env.PORT}`)
})