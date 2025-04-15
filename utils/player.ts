export const convertSeconds = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hoursPlural = hours > 1 ? 's' : '';
  const minutesPlural = minutes > 1 ? 's' : '';
  const secondsPlural = remainingSeconds > 1 ? 's' : '';

  const hourString = hours > 0 ? `${hours} hour${hoursPlural}` : '';
  const minuteString = minutes > 0 ? `${minutes} minute${minutesPlural}` : '';
  const secondString = remainingSeconds > 0 ? `${remainingSeconds} second${secondsPlural}` : '';

  if (hours > 0) {
    return (
      hourString + ' : ' + (minuteString || '0 minute') + (secondString ? ' : ' + secondString : '')
    );
  } else if (!hours && minutes > 0) {
    return minuteString + (secondString ? ' : ' + secondString : '');
  }

  return secondString;
};
