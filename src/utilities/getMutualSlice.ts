const getMutualSlice = <S, T>(
  slicer: (source: S) => T,
  sources: S[],
): Partial<T> => {
  let slice: Partial<T>;

  sources.forEach((source, index) => {
    const newSlice = slicer(source);

    if (index === 0) {
      slice = newSlice;
    } else {
      for (const key in newSlice) {
        if (slice[key] !== newSlice[key]) {
          delete slice[key];
        }
      }
    }
  });

  return slice!;
};
export default getMutualSlice;
