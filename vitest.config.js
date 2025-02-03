const { defineConfig } = require('vitest/config');
const { DB_HOST } = require('./utils/config');
const logger = require('./utils/logger');
require('dotenv').config()

module.exports = defineConfig({
    server: {
        host: DB_HOST,
    },
    test: {
        environment: 'node',
        globals: true,
        reporters: ['verbose'],
        onConsole: (log) => {
            logger.info(log.content);
        },
        include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: ['**/node_modules/**', '**/dist/**'],
},
})