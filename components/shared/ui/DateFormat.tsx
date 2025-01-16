export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
};

export const calculateRemainingDays = (expiryDate: string): number => {
  const currentTime = new Date();
  const expiry = new Date(expiryDate);

  const diffInTime = expiry.getTime() - currentTime.getTime();

  const remainingDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  return remainingDays;
};
