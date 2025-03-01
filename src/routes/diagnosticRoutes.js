import express from 'express';
import { handleDiagnostic, handleGetDiagnostic } from '../services/regDiagnosticController.js';
const routesExpertSystems = express.Router();

routesExpertSystems.get('/', (req, res) => {
  res.send('Welcome to the Expert Systems API!');
});

routesExpertSystems.post('/register',handleDiagnostic)
routesExpertSystems.get('/consultation/:dni', handleGetDiagnostic)

export default routesExpertSystems