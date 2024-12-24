export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate); // Parse the ISO string
  const day = date.getUTCDate(); // Get the day of the month
  const month = date.getUTCMonth() + 1; // Months are zero-based
  const year = date.getUTCFullYear(); // Get the full year

  return `${day}-${month}-${year}`; // Format the date
};

export const calculateRemainingDays = (
  startDate: string,
  expiryDate: string
): number => {
  const start = new Date(startDate);
  const expiry = new Date(expiryDate);

  // Calculate the difference in time (milliseconds)
  const diffInTime = expiry.getTime() - start.getTime();

  // Convert milliseconds to days
  const remainingDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24)); // Removed parseInt

  return remainingDays;
};
