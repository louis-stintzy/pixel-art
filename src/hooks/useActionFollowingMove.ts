import { useCallback, useEffect } from 'react';
import useThrottledExecution from './useThrottledExecution';

// type ThrottledExecutionOptions = {
//   throttleLimit?: number;
//   cbShouldNotRun: boolean;
//   cb: {
//     function: {
//       forMouseEvent?: (e: React.MouseEvent | MouseEvent, args?: any[]) => void;
//       forTouchEvent?: (e: React.TouchEvent | TouchEvent, args?: any[]) => void;
//       forNoEvent?: (args?: any[]) => void;
//     };
//     args: {
//       array?: any[];
//       mouseEvent?: React.MouseEvent | MouseEvent;
//       touchEvent?: React.TouchEvent | TouchEvent;
//     };
//   };
// };

function useActionFollowingMove(
  // ev: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  token: string,
  throttleLimit: number,
  cbShouldNotRun: boolean,
  executeMouseLogic: (e: React.MouseEvent | MouseEvent) => void,
  executeTouchLogic: (e: React.TouchEvent | TouchEvent) => void
) {
  const { throttledExecution, clearThrottledExecution } =
    useThrottledExecution();

  console.log('useActionFollowingMove');
  // defineFunction(executeMouseLogic);

  // useEffect(() => {
  //   const TEO: ThrottledExecutionOptions = {
  //     throttleLimit,
  //     cbShouldNotRun,
  //     cb: {
  //       function: {
  //         forMouseEvent:
  //           ev.type === 'mousemove'
  //             ? (e: React.MouseEvent | MouseEvent) => {
  //                 executeMouseLogic(e);
  //               }
  //             : undefined,
  //         forTouchEvent:
  //           ev.type === 'touchmove'
  //             ? (e: React.TouchEvent | TouchEvent) => {
  //                 executeTouchLogic(e);
  //               }
  //             : undefined,
  //       },
  //       args: {
  //         mouseEvent:
  //           ev.type === 'mousemove'
  //             ? (ev as React.MouseEvent | MouseEvent)
  //             : undefined,
  //         touchEvent:
  //           ev.type === 'touchmove'
  //             ? (ev as React.TouchEvent | TouchEvent)
  //             : undefined,
  //       },
  //     },
  //   };
  //   console.log('define');
  //   // defineFunction(TEO);
  //   return () => {
  //     console.log('clear');
  //     clearThrottledExecution(TEO);
  //   };
  // }, [
  //   cbShouldNotRun,
  //   clearThrottledExecution,
  //   ev,
  //   executeMouseLogic,
  //   executeTouchLogic,
  //   throttleLimit,
  // ]);

  return useCallback(
    (
      event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      throttledExecution({
        token,
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
      throttleLimit,
      throttledExecution,
      token,
    ]
  );
}

export default useActionFollowingMove;
