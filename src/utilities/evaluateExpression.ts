import { simplify } from 'mathjs';
import { validateNumber } from './validateNumber';

export const evaluateExpression = (expression: string) => {
  let value: number;

  try {
    value = simplify(expression).evaluate();
  } catch {}

  if (validateNumber(value!)) {
    return value!;
  } else {
    return NaN;
  }
};
