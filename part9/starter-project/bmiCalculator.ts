interface BmiValues {
  height: number,
  weight: number
}

export const parseArguments = (height: number, weight: number): BmiValues => {
  if (height <= 0 || weight <= 0) {
    throw new Error('Height and weight must be positive');
  }

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Height and weight must be numbers');
  }

  return {
    height,
    weight
  };
}

export const calculateBmi = (height: number, weight: number): number => {
  return weight / ( (height/100) ** 2 );
}

export const bmiCategory = (bmi: number): string => {
  const bmiFixed = bmi.toFixed(2);

  switch(true) {
    case(bmi < 16.0):
      return `Underweight, severe thinness (${bmiFixed})`;
    case(bmi < 16.9):
      return `Underweight, moderate thinness (${bmiFixed})`;
    case(bmi < 18.4):
      return `Underweight, mild thinness (${bmiFixed})`;
    case(bmi < 24.9):
      return `Normal (${bmiFixed})`;
    case(bmi < 29.9):
      return `Overweight, pre-obese (${bmiFixed})`;
    case(bmi < 34.9):
      return `Obese, class I (${bmiFixed})`;
    case(bmi < 39.9):
      return `Obese, class II (${bmiFixed})`;
    case(bmi > 40.0):
      return `Obese, class III (${bmiFixed})`;
    default:
      throw new Error('Invalid BMI');
  }
}

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(Number(process.argv[2]), Number(process.argv[3]));

    const bmi = calculateBmi(height, weight);
    const category = bmiCategory(bmi);

    console.log(category);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error', error.message);
    }
  }
}