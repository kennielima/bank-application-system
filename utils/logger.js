const winston = require('winston');
const { combine, json, timestamp, errors, colorize, simple } = winston.format;
const fs = require("fs");


const formatDate = () => {
    var d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${year}${month}${day}`;
};

const getFile = (type) => {
    const d = formatDate();
    const filename = `logs/${d}${type}.log`;
    fs.open(filename, "r", function (err, fd) {
        if (err) {
            fs.writeFile(filename, "", function (err) {
                if (err) {
                    return `logs/${type}.log`;
                }
                return filename;
            });
        } else {
            return filename;
        }
    });
    return filename;
};

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        colorize(),
        simple(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        json()),
    transports: [
        new winston.transports.Console({
            format: combine(
                colorize(),
                simple(),
            )
        }),
        new winston.transports.File({
            filename: getFile("error"),
            level: 'error'
        }),
        new winston.transports.File({
            filename: getFile("info"),
            level: 'info'
        }),
        new winston.transports.File({
            filename: getFile("warn"),
            level: 'warn'
        })
    ],
    defaultMeta: { service: 'checkout-service' }
});


module.exports = logger;