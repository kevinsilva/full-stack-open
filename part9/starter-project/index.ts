import express from 'express';
const app = express();
import { calculateBmi, parseArguments, bmiCategory } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  try {
    parseArguments(height, weight);
    const bmi = calculateBmi(height, weight);
    const category = bmiCategory(bmi);

    res.send({
      weight,
      height,
      category
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(`malformatted parameters: ${error.message}`);
   }
   res.status(500).send('Internal server error');
  }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});