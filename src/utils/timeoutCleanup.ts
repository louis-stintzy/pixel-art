const timeoutCleanup = (
  timeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>
) => {
  const currentTimeout = timeoutRef.current;
  console.log('currentTimeout to clear: ', currentTimeout);
  if (currentTimeout) {
    clearTimeout(currentTimeout);
  }
};

export default timeoutCleanup;
