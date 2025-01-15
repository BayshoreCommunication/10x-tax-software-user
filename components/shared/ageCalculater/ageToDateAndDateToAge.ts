// Function to calculate Date of Birth from Age
const calculateDateOfBirth = (age: number) => {
  const today = new Date();
  const birthYear = today.getFullYear() - age;

  // Adjust for the birth month and day (assumes the birthdate is after today's month and day if the age hasn't reached yet this year)
  let month = today.getMonth();
  let day = today.getDate();

  // Set the birthdate to the same month and day as today, but subtract the age years
  const birthDate = new Date(birthYear, month, day);

  // If the birthdate is after today's date this year, adjust the year
  if (today < birthDate) {
    birthDate.setFullYear(birthYear - 1);
  }

  return birthDate.toISOString(); // Returning in ISO format
};

// Function to calculate Age from Date of Birth
const calculateAge = (birthdate: string) => {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  // If the current date is before the birthday this year, subtract 1 from the age
  if (
    month < birthDate.getMonth() ||
    (month === birthDate.getMonth() && day < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

// Exporting both functions
export { calculateAge, calculateDateOfBirth };
