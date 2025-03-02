import sql from '../config/db.js';

// Registrar diagnóstico
async function registerDiagnostic(username, dni, diagnosis, responses) {

    try {
        const userExists = await sql`SELECT id FROM users WHERE dni = ${dni}`;
        let user_id;

        if (userExists.length === 0) {
            const register = await sql`INSERT INTO users (username, dni) 
                VALUES (${username}, ${dni}) 
                RETURNING id`;
            user_id = register[0].id;

        } else {
            user_id = userExists[0].id;
        }

        const diagnosticEntry = await sql` INSERT INTO diagnostics (user_id, diagnosis)
            VALUES (${user_id}, ${diagnosis})
            RETURNING id`;

        const diagnosis_id = diagnosticEntry[0].id;

        await sql`
            INSERT INTO responses (user_id, diagnosis_id, p1, p2, p3, p4, p5)
            VALUES (${user_id}, ${diagnosis_id}, ${responses.p1}, ${responses.p2}, ${responses.p3}, ${responses.p4}, ${responses.p5})`;
        return { message: 'Registro con éxito' };

    } catch (error) {
        console.error('Error al registrar el diagnóstico y respuestas:', error);
        throw error;
    }
}

// Obtener diagnóstico
async function getDiagnostic(dni) {
    try {
        const user = await sql`SELECT * FROM get_diagnosis_two(${dni})`;
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