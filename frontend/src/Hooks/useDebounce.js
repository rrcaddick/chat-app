import { useRef } from "react";

export const useDebounce = () => {
  const debounceTimer = useRef();
  const debounceFunction = useRef();

  const debounce = (debounceFn, delayTime) => {
    debounceFunction.current = debounceFn;
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      debounceFn();
      debounceTimer.current = undefined;
    }, delayTime);
  };

  const cancelDebounce = ({ executeDebounceFn = false }) => {
    if (executeDebounceFn && debounceTimer.current) debounceFunction.current();
    clearTimeout(debounceTimer.current);
    debounceTimer.current = undefined;
  };

  return { debounce, cancelDebounce };
};
