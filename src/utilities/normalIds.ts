import { MethodIds } from 'types/Parts';

export default function normalIds(ids: MethodIds) {
  return typeof ids === 'string' ? [ids] : ids;
}
