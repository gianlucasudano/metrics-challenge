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

export { padNumber, secondToHumanReadable };
