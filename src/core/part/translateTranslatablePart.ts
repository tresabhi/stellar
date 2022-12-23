import translateTranslatableParts from './translateTranslatableParts';

export default function translateTranslatablePart(
  x: number,
  y: number,
  id: string,
) {
  translateTranslatableParts(x, y, [id]);
}
