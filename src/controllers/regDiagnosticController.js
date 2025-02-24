import { registerDiagnostic } from '../models/query.js'
import { runRules } from './rulesController.js'

export const handleDiagnostic = async (req, res) => {
    const { name, lastname, dni, symptoms } = req.body

    try {
        const results = await runRules(symptoms)
        const diagnostics = results.events.map(event => event.params.diagnostico)

        // Save the diagnostic in the database
        for (const diagnosis of diagnostics) {
            await registerDiagnostic(name, lastname, dni, diagnosis)
        }

        res.status(200).json({ message: 'Diagnóstico registrado con éxito', diagnostics })
    } catch (error) {
        console.error('Error al procesar el diagnóstico:', error)
        res.status(500).json({ message: 'Error al procesar el diagnóstico' })
    }
}