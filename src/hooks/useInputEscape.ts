import {
  KeyboardEvent as ReactKeyboardEvent,
  KeyboardEventHandler,
} from 'react';

export const ESCAPE_KEYS = ['Escape', 'Enter'];

export const useInputEscape = (callback?: KeyboardEventHandler) => {
  const handleKeyDown = (
    event: ReactKeyboardEvent<HTMLInputElement> | Event,
  ) => {
    if (ESCAPE_KEYS.some((key) => (event as KeyboardEvent).key === key)) {
      (event.target as HTMLInputElement).blur();
    }

    if (callback) callback(event as ReactKeyboardEvent<HTMLInputElement>);
  };

  return handleKeyDown;
};
