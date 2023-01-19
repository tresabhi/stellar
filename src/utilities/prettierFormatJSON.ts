import { format } from 'prettier';

export default function prettierFormatJSON(object: object) {
  try {
    return format(JSON.stringify(object));
  } catch (e) {
    alert(e);
  }

  return '';
}
