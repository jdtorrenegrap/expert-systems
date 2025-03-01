import express from 'express'
import bodyParser from 'body-parser'
import { PORT } from './src/config/config.js'
import routesExpertSystems from './src/routes/diagnosticRoutes.js'


const app = express()
app.use(bodyParser.json()) 


// Routes
app.use('/', routesExpertSystems)

// Start server
app.listen(PORT, () => {    
    console.log(`http://localhost:${PORT}`)
})