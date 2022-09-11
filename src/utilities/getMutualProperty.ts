import { getPart } from 'core/part';
import { Part } from 'game/parts/Part';

export const getMutualProperty = <Type extends Part, Value = number | string>(
  ids: string[],
  slice: (state: Type) => Value,
) => {
  const part = getPart<Type>(ids[0]);

  if (part) {
    const initialValue = slice(part);
    const mixed = ids.some((id) => {
      const part = getPart<Type>(id);

      if (part) {
        const value = slice(part);

        return initialValue !== value;
      } else {
        return false;
      }
    });

    return mixed ? undefined : initialValue;
  }
};
