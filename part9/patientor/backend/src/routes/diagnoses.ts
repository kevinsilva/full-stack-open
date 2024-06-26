import express from 'express';
import diagnoseServices from '../services/diagnoseServices';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseServices.getEntries());
});

export default router;