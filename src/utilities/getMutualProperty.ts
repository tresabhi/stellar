import { getPart } from 'core/part';
import { Part } from 'game/parts/Part';

export const getMutualProperty = <Type extends Part, Value = number | string>(
  ids: string[],
  slice: (state: Type) => Value,
) => {
  const part = getPart<Type>(ids[0]);
  const initialValue = slice(part);
  const mixed = ids.some((id) => initialValue !== slice(getPart<Type>(id)));

  return mixed ? undefined : initialValue;
};
