import {useEffect, useState} from 'react';

export const useDebounce = (input: string = '', timer: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, timer);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, timer]);

  return debouncedValue;
};
