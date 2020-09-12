const forceDigits = (val:number) => Math.floor(val).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

const millisecondsToTime = (ms: number): string => {
  // 1- Convert to seconds:
  let seconds = ms / 1000;
  // 2- Extract hours:
  const hours = seconds / 3600; // 3,600 seconds in 1 hour
  seconds %= 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  const minutes = seconds / 60; // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds %= 60;
  return `${forceDigits(minutes)}:${forceDigits(seconds)}`;
};

const timeToMilliseconds = (time: string): number => {
  const [mins, secs] = time.split(':');
  if (!mins || !secs) {
    return 0;
  }

  const parsedSeconds = parseInt(secs, 10);
  const parsedMinutes = parseInt(mins, 10);

  return (parsedSeconds * 1000) + (parsedMinutes * 1000 * 60);
};

export default { millisecondsToTime, timeToMilliseconds };
