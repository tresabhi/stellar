import {
  KeyboardEvent as ReactKeyboardEvent,
  KeyboardEventHandler,
} from 'react';

export const ESCAPE_KEYS = ['Escape', 'Enter'];

export const useInputEscape = (callback?: KeyboardEventHandler) => {
  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (ESCAPE_KEYS.some((key) => event.key === key)) {
      (event.target as HTMLInputElement).blur();
    }

    if (callback) callback(event);
  };

  return handleKeyDown;
};
