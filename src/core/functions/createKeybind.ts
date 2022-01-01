import { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { KeyboardEventKey } from 'keyboard-event-key-type';

export type Modifier = 'Shift' | 'Control' | 'Alt' | 'Meta';

export const ModifierBools = {
  Shift: 'shiftKey' as 'shiftKey',
  Control: 'ctrlKey' as 'ctrlKey',
  Alt: 'altKey' as 'altKey',
  Meta: 'metaKey' as 'metaKey',
};

export type Keybind =
  | [Modifier | Modifier[], KeyboardEventKey]
  | KeyboardEventKey;

export const DefaultOptions = {
  preventDefault: true,
  stopPropagation: false,
};

export type Options = Partial<typeof DefaultOptions>;

/**
 * Binds a callback to a key combo with minimal boilerplate.
 * @param callback A function that is run when the key bind is pressed
 * @param keybinds A specific selection of keys that have to be pressed
 * @param preventDefault Prevents the default actions taken by the browser
 * @returns `void`
 */
export default function createKeybind(
  callback: Function,
  keybind: Keybind | Keybind[],
  options?: Options,
) {
  options = { ...DefaultOptions, ...options };

  return (event: KeyboardEvent | ReactKeyboardEvent) => {
    const callCompositeCallback = () => {
      if (options?.preventDefault) event.preventDefault();
      if (options?.stopPropagation) event.stopPropagation();

      (async () => callback())();
    };

    const parseModifier = (modifier: Modifier) =>
      event[ModifierBools[modifier]];

    const modifier =
      typeof keybind === 'string'
        ? true
        : typeof keybind[0] === 'string'
        ? parseModifier(keybind[0] as Modifier)
        : (keybind[0] as Modifier[]).every(parseModifier);

    const key =
      event.key === (typeof keybind === 'string' ? keybind : keybind[1]);

    if (modifier && key) callCompositeCallback();
  };
}
