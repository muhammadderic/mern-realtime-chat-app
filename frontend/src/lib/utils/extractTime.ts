/**
 * Extracts time in HH:MM format from a Date object or ISO string
 * @param dateInput - Accepts Date object, ISO string, or number (timestamp)
 * @returns Formatted time string (HH:MM)
 */
export function extractTime(dateInput: Date | string | number): string {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date input');
  }

  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

/**
 * Pads a number with leading zero if single-digit
 * @param number - Numeric value to pad
 * @returns String representation with leading zero if needed
 */
function padZero(number: number): string {
  return Math.floor(number).toString().padStart(2, "0");
}
