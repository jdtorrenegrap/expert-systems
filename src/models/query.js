import sql from '../config/db.js';

// Registrar diagnóstico
async function registerDiagnostic(username, dni, diagnosis) {
    try {
        const userExists = await sql`SELECT id FROM users WHERE dni = ${dni}`;
        let user_id;

        if (userExists.length === 0) {
            const register = await sql`INSERT INTO users (username, dni) 
                VALUES (${username}, ${dni}) 
                RETURNING id
            `;
            user_id = register[0].id;
        } else {
            user_id = userExists[0].id;
        }

        await sql`
            INSERT INTO diagnostics (user_id, diagnosis)
            VALUES (${user_id}, ${diagnosis})
        `;

        return { message: 'Diagnóstico registrado con éxito' };
    } catch (error) {
        console.error('Error al registrar el diagnóstico:', error);
        throw error;
    }
}
// Obtener diagnóstico
async function getDiagnostic(dni) {
    try {
        const user = await sql`SELECT * FROM get_diagnosis(${dni})`;

        if (user.length === 0) {
            return null;
        }
        return user;
    } catch (error) {
        console.error('Error al obtener los diagnósticos:', error);
        throw error;
    }
}

export { registerDiagnostic, getDiagnostic };