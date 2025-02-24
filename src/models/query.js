import sql from '../config/db.js'

// Registrar diagnóstico
async function registerDiagnostic(name, lastname, dni, diagnosis) {
    try {
        const register = await sql`
            WITH inserted_user AS (
                INSERT INTO users (name, lastname, dni) 
                VALUES (${name}, ${lastname}, ${dni}) 
                RETURNING id
            )
            INSERT INTO diagnostics (user_id, diagnosis) 
            VALUES (
                (SELECT id FROM inserted_user), 
                ${diagnosis}
            )
        `
        return register
    } catch (error) {
        console.error('Error al registrar el diagnóstico:', error)
        throw error
    }
}

// Obtener diagnóstico
async function getDiagnostic(dni) {
    try {
        const user = await sql`
            SELECT * FROM get_user_diagnosis(${dni})
        `
    } catch (error) {
        console.error('Error al obtener los diagnósticos:', error)
        throw error
    }
}
export { registerDiagnostic
    , getDiagnostic
 }