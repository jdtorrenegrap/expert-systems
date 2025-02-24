import express from 'express';
import { handleDiagnostic } from '../controllers/regDiagnosticController.js';

const routesExpertSystems = express.Router();

routesExpertSystems.get('/', (req, res) => {
  res.send('Hello World!');
});

routesExpertSystems.post('/diagnostic', handleDiagnostic)

export default routesExpertSystems