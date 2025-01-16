const server = require('./server')

const db = require('./database/models');
db.sequelize.sync({ alter: true })
    .then(() => console.log('DATABASE CONNECTED SUCCESSFULLY'))
    .catch(console.error);

server.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})