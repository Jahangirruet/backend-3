const mysql = require('mysql2');

const dotenv = require('dotenv');

dotenv.config()

const connection = mysql.connect(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password:  process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
)

const connectDB = async() =>{
    try {
        await connection.connect();
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection;