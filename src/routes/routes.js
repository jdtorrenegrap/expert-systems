import express from 'express';
import { handleDiagnostic, handleGetDiagnostic } from '../controllers/regDiagnosticController.js';

const routesExpertSystems = express.Router();

routesExpertSystems.get('/', (req, res) => {
  res.send('Welcome to the Expert Systems API!');
});

routesExpertSystems.post('/diagnostic', handleDiagnostic)
routesExpertSystems.get('/diagnostic/:dni', handleGetDiagnostic)
export default routesExpertSystems