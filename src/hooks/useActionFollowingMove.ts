import { useCallback } from 'react';
import useThrottledExecution from './useThrottledExecution';
import TimeoutStore from '../store/TimeoutStore';

function useActionFollowingMove(
  token: string,
  timeoutStore: TimeoutStore,
  lastRanRef: React.MutableRefObject<number | undefined>,
  timeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>,
  throttleLimit: number,
  cbShouldNotRun: boolean,
  executeMouseLogic: (e: MouseEvent) => void,
  executeTouchLogic: (e: TouchEvent) => void
) {
  const { throttledExecution } = useThrottledExecution(timeoutStore);

  return useCallback(
    (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
      throttledExecution({
        token,
        lastRanRef,
        timeoutRef,
        throttleLimit,
        cbShouldNotRun,
        cb: {
          function: {
            forMouseEvent:
              event.type === 'mousemove'
                ? (e: MouseEvent) => {
                    executeMouseLogic(e);
                  }
                : undefined,
            forTouchEvent:
              event.type === 'touchmove'
                ? (e: TouchEvent) => {
                    executeTouchLogic(e);
                  }
                : undefined,
          },
          args: {
            mouseEvent:
              event.type === 'mousemove' ? (event as MouseEvent) : undefined,
            touchEvent:
              event.type === 'touchmove' ? (event as TouchEvent) : undefined,
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
      token,
    ]
  );
}

export default useActionFollowingMove;
