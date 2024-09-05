import { RefObject, useEffect } from 'react';

export function useHandleOutsideHooks(
  ref: RefObject<HTMLElement>,
  callback: () => void,
) {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!!ref && ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [ref, callback]);
}
