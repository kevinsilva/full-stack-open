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
  if (target <= 0) {
    console.error('Target must be a positive number');
    return false
  }

  if (hours.some(hour => hour < 0)) {
    console.error('All hours must be positive');
    return false
  }

  return true
}

try {
  if (!process.argv[2] || !process.argv[3]) {
    throw new Error('Please provide arguments');
  }

  const hours = process.argv[2].split(',').map(hour => Number(hour));
  const target = Number(process.argv[3])

  if (validateInput(hours, target)) {
    console.log(calculateExercises(hours, target));
  }
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error', error.message);
  }
}
