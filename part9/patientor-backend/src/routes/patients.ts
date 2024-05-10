import express from 'express';
import patientServices from '../services/patientServices';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientServices.getNonSensitiveEntries());
});

router.get('/:patientId', (req, res) => {
  const patient = patientService.getOne(req.params.patientId);

  if (patient) res.send(patient);
  else res.sendStatus(404);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientServices.addPatient(newPatientEntry);

    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) errorMessage += ' Error: ' + error.message;

    res.status(400).send(errorMessage);
  }
});

export default router;