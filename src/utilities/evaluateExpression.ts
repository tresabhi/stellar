import { simplify } from 'mathjs';
import { validateNumber } from './validateNumber';

export const evaluateExpression = (expression: string) => {
  try {
    const evaluated = simplify(expression).evaluate();

    return validateNumber(evaluated) ? evaluated : NaN;
  } catch {
    return NaN;
  }
};
