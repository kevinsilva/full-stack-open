interface ExerciseResults {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string
  target: number,
  average: number,
}

const calculateExercises = (hours: number[], target: number): ExerciseResults => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(hour => hour > 0).length;
  const average = hours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = average > target ? 3 : average < target ? 1 : 2;
  const descriptions = {
    1: 'not too bad but could be better',
    2: 'good',
    3: 'excellent'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: descriptions[rating],
    target,
    average
  };
};


const validateInput = (hours: number[], target: number): boolean => {
  if (target <= 0 || Number.isNaN(target)) {
    throw new Error('Target must be a positive number');
  }

  if (hours.some(hour => hour < 0 || hour > 24)) {
    throw new Error('All hours must be between 0 and 24');
  }

  if(hours.some(hour => typeof hour !== 'number' || Number.isNaN(hour))) {
    throw new Error('All hours must be numbers');
  }

  return true
}

try {
  if (!process.argv.length || process.argv.length < 4) {
    throw new Error('Please provide arguments');
  }

  const hours = process.argv.slice(3).map(hour => Number(hour));
  const target = Number(process.argv[2])

  if (validateInput(hours, target)) {
    console.log(calculateExercises(hours, target));
  }
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error:', error.message);
  }
}
