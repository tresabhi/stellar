import { Blueprint, blueprintData } from 'game/Blueprint';

export const dataFixerUppers: Record<
  number,
  ((blueprint: Blueprint) => Blueprint) | null
> = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: (oldBlueprint) => {
    const blueprint = oldBlueprint;

    Object.keys(blueprint.parts).forEach((id) => {
      blueprint.parts[id].parent = (
        blueprint.parts[id] as unknown as { parent_id: string | null }
      ).parent_id;
      delete (blueprint.parts[id] as unknown as { parent_id: undefined })
        .parent_id;
    });

    (blueprint.format_version as number) = 7;

    return blueprint;
  },
};

/**
 * @warning object supplied to argument `blueprint` is mutated
 */
export default function dataFixBlueprint(
  blueprint: Blueprint,
): Blueprint | null {
  if (blueprint.format_version === blueprintData.format_version) {
    return blueprint;
  }

  const dataFixerUpper = dataFixerUppers[blueprint.format_version];

  if (dataFixerUpper) {
    const fixedData = dataFixerUpper(blueprint);

    if (fixedData.format_version === blueprintData.format_version) {
      return fixedData;
    }

    return dataFixBlueprint(fixedData);
  }

  return null;
}
