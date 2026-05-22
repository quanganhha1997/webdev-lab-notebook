const calculateAge = function (dateString) {
  const birthDate = new Date(dateString);
  const today = new Date();

  // Check invalid date
  if (isNaN(birthDate.getTime())) {
    return "Error: Invalid date format";
  }

  // Calculate age
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthsDiff = today.getMonth() - birthDate.getMonth();

  const dayDiff = today.getDate() - birthDate.getDate();

  // Adjust if birthday has not happened yet
  if (monthsDiff < 0 || (monthsDiff === 0 && dayDiff < 0)) {
    age--;
  }

  // Singular year
  if (age === 1) {
    return `You are ${age} year old`;
  }

  // More than 125 years old
  if (age > 125) {
    return "Are you sure you are more than 125 years old?";
  }

  // Future date
  if (age < 0) {
    return "Error: Birth date cannot be in the future";
  }

  return `You are ${age} years old`;
};

// Test cases

console.log(calculateAge("2000-07-01"));
// You are 25 years old

console.log(calculateAge("1988-05-18"));
// You are 38 years old

console.log(calculateAge("2025-05-01"));
// You are 1 year old

console.log(calculateAge("2190-01-01"));
// Error: Birth date cannot be in the future

console.log(calculateAge("1800-01-01"));
// Are you sure you are more than 125 years old?

console.log(calculateAge("invalid-date"));
// Error: Invalid date format

// Note: These calculations were done on May 18, 2026.
