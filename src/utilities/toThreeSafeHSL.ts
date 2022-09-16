const numberPattern = /([0-9]|\.)+/g;

export const toThreeSafeHSL = (color: string) =>
  `hsl(${color
    .match(numberPattern)
    ?.map((numberString) => Number(numberString))
    ?.map((number, index) =>
      index === 0 ? Math.round(number) : `${Math.round(number)}%`,
    )
    ?.join(', ')})`;
