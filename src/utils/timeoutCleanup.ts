const timeoutCleanup = (
  timeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>
) => {
  const currentTimeout = timeoutRef.current;
  if (currentTimeout) {
    console.log('currentTimeout to clear: ', currentTimeout);
    clearTimeout(currentTimeout);
  }
};

export default timeoutCleanup;
