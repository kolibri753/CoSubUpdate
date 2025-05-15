/**
 * Converts a formatted time string "HH:MM:SS,mmm" to a number (seconds).
 */
export const parseTime = (timeStr: string): number => {
  const [hms, ms] = timeStr.split(",");
  if (!hms || !ms) return 0;
  const [hrs, mins, secs] = hms.split(":").map(Number);
  return hrs * 3600 + mins * 60 + secs + Number(ms) / 1000;
};
