const reviver = (key: string, value: any) => {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'map') {
      return new Map(value.value);
    }
  }
  return value;
};
export default reviver;
