import { simplify } from 'mathjs';
import validateNumber from './validateNumber';

export default function evaluateExpression(expression: string) {
  try {
    const evaluated = simplify(expression).evaluate();

    return validateNumber(evaluated) ? evaluated : NaN;
  } catch {
    return NaN;
  }
}
