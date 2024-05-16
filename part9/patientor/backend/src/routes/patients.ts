import express from 'express';
import patientServices from '../services/patientServices';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientServices.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientServices.getOne(req.params.id);

  if (patient) {
    if (!patient.entries) patient.entries = [];
    res.send(patient);
  } else res.sendStatus(404);
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
