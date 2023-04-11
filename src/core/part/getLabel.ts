import getLabelFromName from './getLabelFromName';
import getPart from './getPart';

export default function getLabel(id: string): string {
  const { label, n } = getPart(id);
  return label === undefined ? getLabelFromName(n) : label;
}
