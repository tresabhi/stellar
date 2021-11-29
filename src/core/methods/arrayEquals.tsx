const arrayEquals = (array1: any[], array2: any[]) =>
  array1.length === array2.length
    ? array1.some((array1Value, index) => array1Value === array2[index])
    : false;

export default arrayEquals;
