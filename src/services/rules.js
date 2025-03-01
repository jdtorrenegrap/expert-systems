import { Engine } from 'json-rules-engine';

/*
Preguntas:
1. question_1 = ¿Experimentas dolor muscular frecuente?
2. question_2 = ¿Sientes debilidad muscular?
3. question_3 = ¿Ha tenido calambres musculares recurrentes?
4. question_4 = ¿Sientes inflamación en los músculos?
5. question_5 = ¿Ha tenido dificultad para mover alguna parte del cuerpo?
*/

// Definir las 32 reglas (una por cada combinación posible)
const rules = [
    // Combinación 1: S, S, S, S, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'miositis', params: { diagnostico: 'Posible miositis (inflamación muscular severa)' } }
    },
    // Combinación 2: S, S, S, S, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'distrofia_muscular', params: { diagnostico: 'Posible distrofia muscular' } }
    },
    // Combinación 3: S, S, S, N, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'fatiga_muscular_cronica', params: { diagnostico: 'Posible fatiga muscular crónica' } }
    },
    // Combinación 4: S, S, S, N, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'sobrecarga_muscular', params: { diagnostico: 'Posible sobrecarga muscular' } }
    },
    // Combinación 5: S, S, N, S, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'polimiositis', params: { diagnostico: 'Posible polimiositis' } }
    },
    // Combinación 6: S, S, N, S, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'miopatia_inflamatoria', params: { diagnostico: 'Posible miopatía inflamatoria' } }
    },
    // Combinación 7: S, S, N, N, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'esclerosis_multiple', params: { diagnostico: 'Posible esclerosis múltiple (afectación muscular)' } }
    },
    // Combinación 8: S, S, N, N, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'sindrome_de_fatiga_cronica', params: { diagnostico: 'Posible síndrome de fatiga crónica' } }
    },
    // Combinación 9: S, N, S, S, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'rabdomiolisis', params: { diagnostico: 'Posible rabdomiólisis' } }
    },
    // Combinación 10: S, N, S, S, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'lesion_muscular_traumática', params: { diagnostico: 'Posible lesión muscular traumática' } }
    },
    // Combinación 11: S, N, S, N, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'calambres_severos', params: { diagnostico: 'Posible calambres musculares severos' } }
    },
    // Combinación 12: S, N, S, N, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'desequilibrio_electrolitico', params: { diagnostico: 'Posible deshidratación o desequilibrio electrolítico' } }
    },
    // Combinación 13: S, N, N, S, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'fibromialgia', params: { diagnostico: 'Posible fibromialgia' } }
    },
    // Combinación 14: S, N, N, S, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'mialgia', params: { diagnostico: 'Posible mialgia (dolor muscular sin debilidad)' } }
    },
    // Combinación 15: S, N, N, N, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'contractura_muscular', params: { diagnostico: 'Posible contractura muscular' } }
    },
    // Combinación 16: S, N, N, N, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: true },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'dolor_muscular_leve', params: { diagnostico: 'Dolor muscular leve' } }
    },
    // Combinación 17: N, S, S, S, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'miastenia_gravis', params: { diagnostico: 'Posible miastenia gravis' } }
    },
    // Combinación 18: N, S, S, S, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'enfermedad_neuromuscular', params: { diagnostico: 'Posible enfermedad neuromuscular' } }
    },
    // Combinación 19: N, S, S, N, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'neuropatia_periferica', params: { diagnostico: 'Posible neuropatía periférica' } }
    },
    // Combinación 20: N, S, S, N, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'debilidad_muscular_sin_dolor', params: { diagnostico: 'Debilidad muscular sin dolor' } }
    },
    // Combinación 21: N, S, N, S, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'miopatia_metabolica', params: { diagnostico: 'Posible miopatía metabólica' } }
    },
    // Combinación 22: N, S, N, S, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'enfermedad_mitocondrial', params: { diagnostico: 'Posible enfermedad mitocondrial' } }
    },
    // Combinación 23: N, S, N, N, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'atrofia_muscular', params: { diagnostico: 'Posible atrofia muscular' } }
    },
    // Combinación 24: N, S, N, N, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: true },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'debilidad_muscular_leve', params: { diagnostico: 'Debilidad muscular leve' } }
    },
    // Combinación 25: N, N, S, S, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'inflamacion_muscular_localizada', params: { diagnostico: 'Inflamación muscular localizada' } }
    },
    // Combinación 26: N, N, S, S, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'lesion_muscular_leve', params: { diagnostico: 'Posible lesión muscular leve' } }
    },
    // Combinación 27: N, N, S, N, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'calambre_muscular_ocasional', params: { diagnostico: 'Calambre muscular ocasional' } }
    },
    // Combinación 28: N, N, S, N, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: true },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'calambre_sin_complicaciones', params: { diagnostico: 'Calambre muscular sin complicaciones' } }
    },
    // Combinación 29: N, N, N, S, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'inflamacion_sin_dolor', params: { diagnostico: 'Inflamación muscular sin dolor' } }
    },
    // Combinación 30: N, N, N, S, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: true },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'inflamacion_leve', params: { diagnostico: 'Inflamación muscular leve' } }
    },
    // Combinación 31: N, N, N, N, S
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: true }
            ]
        },
        event: { type: 'rigidez_muscular', params: { diagnostico: 'Rigidez muscular' } }
    },
    // Combinación 32: N, N, N, N, N
    {
        conditions: {
            all: [
                { fact: 'question_1', operator: 'equal', value: false },
                { fact: 'question_2', operator: 'equal', value: false },
                { fact: 'question_3', operator: 'equal', value: false },
                { fact: 'question_4', operator: 'equal', value: false },
                { fact: 'question_5', operator: 'equal', value: false }
            ]
        },
        event: { type: 'sin_diagnostico_evidente', params: { diagnostico: 'Sin diagnóstico muscular evidente' } }
    }
];

const engine = new Engine(rules);

export const runRules = async (symptoms) => {
    return await engine.run(symptoms);
};