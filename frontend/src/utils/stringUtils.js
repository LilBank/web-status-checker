export const formatTime = (milliseconds) => {
  const seconds = (milliseconds / 1000).toFixed(2);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = (seconds % 60).toFixed(2);
  return { minutes, seconds: remainingSeconds };
};
