export default function calculateAge(dateString) {
  // Extract day, month, and year from the input string
  const month = parseInt(dateString.substring(0, 2)) - 1; // Months are 0-indexed in JS
  const day = parseInt(dateString.substring(2, 4));
  const year = parseInt(dateString.substring(4, 8));

  // Create a date object for the given date
  const birthDate = new Date(year, month, day);
  const today = new Date();

  // Calculate the age
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  // Adjust the age if the birth date has not occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}
