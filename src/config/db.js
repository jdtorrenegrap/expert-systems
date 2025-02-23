require('dotenv').config({ path: '../../.env' }) // esto significa que el archivo .env está en la carpeta raíz
const postgres = require('postgres')

const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString)

module.exports = sql