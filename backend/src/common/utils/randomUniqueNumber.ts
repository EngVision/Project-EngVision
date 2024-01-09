const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateUniqueRandomNumber = (
  existingNumbers: number[],
  min: number,
  max: number,
) => {
  let randomNumber: number;

  do {
    randomNumber = generateRandomNumber(min, max);
  } while (existingNumbers.includes(randomNumber));

  return randomNumber;
};
