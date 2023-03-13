function padNumber(num: number): string {
  return num.toString().padStart(2, '0');
}

function secondToHumanReadable(secs: number): Record<string, string> {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = Math.floor(secs % 60);

  return {
    hours: padNumber(hours),
    minutes: padNumber(minutes),
    seconds: padNumber(seconds),
  };
}

// R = N / D = 3650 / 86400 = 0.042
// Percentage width of child container = R * 100% = 4.2%
// percentage compared to total days
function percComparedToDays(totalsSeconds: number, daysInSecs: number): number {
  const ratio = totalsSeconds / daysInSecs;
  return ratio * 100;
}

export { padNumber, secondToHumanReadable, percComparedToDays };
