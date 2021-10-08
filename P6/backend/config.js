const dotenv = require('dotenv');
const path = require('path');


dotenv.config({path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)});
module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    JWT_TOKEN_SECRET : process.env.JWT_TOKEN_SECRET,
    DB_USERNAME : process.env.DB_USERNAME,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DATA_BASE_NAME : process.env.DATA_BASE_NAME,
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 3000
}