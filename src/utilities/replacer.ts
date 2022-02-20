const replacer = (key: string, value: any) => {
  if (value instanceof Map) {
    return {
      dataType: 'map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
};
export default replacer;
