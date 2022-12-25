import { MethodIds } from 'types/Parts';

export default function normalizeIds(ids: MethodIds) {
  return typeof ids === 'string' ? [ids] : ids;
}
