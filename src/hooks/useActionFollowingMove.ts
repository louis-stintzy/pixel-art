import { useCallback } from 'react';
import useThrottledExecution from './useThrottledExecution';

function useActionFollowingMove(
  lastRanRef: React.MutableRefObject<number | undefined>,
  timeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>,
  throttleLimit: number,
  cbShouldNotRun: boolean,
  executeMouseLogic: (e: React.MouseEvent | MouseEvent) => void,
  executeTouchLogic: (e: React.TouchEvent | TouchEvent) => void
) {
  const { throttledExecution } = useThrottledExecution();

  return useCallback(
    (
      event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      throttledExecution({
        lastRanRef,
        timeoutRef,
        throttleLimit,
        cbShouldNotRun,
        cb: {
          function: {
            forMouseEvent:
              event.type === 'mousemove'
                ? (e: React.MouseEvent | MouseEvent) => {
                    executeMouseLogic(e);
                  }
                : undefined,
            forTouchEvent:
              event.type === 'touchmove'
                ? (e: React.TouchEvent | TouchEvent) => {
                    executeTouchLogic(e);
                  }
                : undefined,
          },
          args: {
            mouseEvent:
              event.type === 'mousemove'
                ? (event as React.MouseEvent | MouseEvent)
                : undefined,
            touchEvent:
              event.type === 'touchmove'
                ? (event as React.TouchEvent | TouchEvent)
                : undefined,
          },
        },
      });
    },
    [
      cbShouldNotRun,
      executeMouseLogic,
      executeTouchLogic,
      lastRanRef,
      throttleLimit,
      throttledExecution,
      timeoutRef,
    ]
  );
}

export default useActionFollowingMove;
