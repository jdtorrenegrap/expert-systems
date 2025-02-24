import dotenv from 'dotenv'
import postgres from 'postgres'

dotenv.config({ path: '../../.env' }) 
const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString)

// Validar la conexión a la base de datos
async function validateConnection() {
    try {
        await sql`SELECT 1`
        console.log('Conexión a la base de datos exitosa')
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error)
    }
}

validateConnection()

export default sql