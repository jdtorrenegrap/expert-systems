import { registerDiagnostic, getDiagnostic} from '../models/query.js'
import { runRules } from './rules.js'

export const handleDiagnostic = async (req, res) => {

    const { username, dni, question_1, question_2, question_3, question_4, question_5 } = req.body

    // Proccess the diagnostic
    try {
        console.log("JSON: ", req.body)
        const symptoms = {
            question_1,
            question_2,
            question_3,
            question_4,
            question_5
        }

        const results = await runRules(symptoms)
        const diagnostics = results.events.map(event => event.params.diagnostico)

        // Save the diagnostic in the database
        for (const i of diagnostics) {
            await registerDiagnostic(username, dni, i)
        }
        res.status(200).json({ message: 'Diagnóstico registrado con éxito', diagnostics })
        
    } catch (error) {
        console.error('Error al procesar el diagnóstico:', error)
        res.status(500).json({ message: 'Error al procesar el diagnóstico' })
    }
}

export const handleGetDiagnostic = async (req, res) => {
    const { dni } = req.params 

    try {
        const diagnostics = await getDiagnostic(dni)
        
        // Si no hay diagnósticos
        if (!diagnostics) {
            return res.status(404).json({ message: 'No se encontraron diagnósticos con el DNI proporcionado' })
        }
        res.status(200).json({ diagnostics })

    } catch (error) {
        console.error('Error al obtener el diagnóstico:', error)
        res.status(500).json({ message: 'Error al obtener el diagnóstico' })
    }
}