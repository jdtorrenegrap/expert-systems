import { Engine } from 'json-rules-engine'

const fetch = {
    dolor_muscular: true,
    debilidad_muscular: true,
    calambres: false,
    fatiga: false,
    inflamacion: false
}

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

engine
    .run(fetch) // estos son los datos que se le pasan a las reglas
    .then(results => {
        results.events.forEach(event => { // esto es un bucle que recorre los eventos que se han disparado
            console.log(event.params.diagnostico)
        })
    })
    .catch(err => {
        console.log('Error al ejecutar las reglas', err)
    })