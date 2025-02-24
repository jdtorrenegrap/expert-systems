import { Engine } from 'json-rules-engine'

// Definir las reglas
const rules = [
    {
        conditions: {
            all: [
                { fact: 'dolor_muscular', operator: 'equal', value: true },
                { fact: 'debilidad_muscular', operator: 'equal', value: true },
            ]
        },
        event: { type: 'posible_fatiga_muscular', params: { diagnostico: 'Posible fatiga muscular' } }
    },
    {
        conditions: {
            all: [
                { fact: 'calambres', operator: 'equal', value: true },
                { fact: 'fatiga', operator: 'equal', value: true }
            ]
        },
        event: { type: 'posible_desnutricion', params: { diagnostico: 'Podrías tener deficiencia de minerales' } }
    },
    {
        conditions: {
            all: [
                { fact: 'inflamacion', operator: 'equal', value: true },
                { fact: 'dolor_muscular', operator: 'equal', value: true }
            ]
        },
        event: { type: 'posible_tendinitis', params: { diagnostico: 'Podrías tener inflamación en los tendones' } }
    }
]

const engine = new Engine(rules)

export const runRules = async (symptoms) => {
    return await engine.run(symptoms)
}