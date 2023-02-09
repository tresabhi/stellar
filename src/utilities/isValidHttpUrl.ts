/**
 * Thanks, Pavlo!
 *
 * https://stackoverflow.com/a/43467144/12294756
 */
export default function isValidHttpUrl(string: string) {
  let url: URL;

  try {
    url = new URL(string);
  } catch (error) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}
