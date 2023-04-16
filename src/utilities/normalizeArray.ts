export default function normalizeArray<Type>(ids: Type | Type[]) {
  return typeof ids === 'string' ? [ids] : (ids as Type[]);
}
