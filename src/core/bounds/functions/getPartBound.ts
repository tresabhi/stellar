import useBounds from 'hooks/useBounds';

export const getPartBound = (id: string) => {
  return useBounds.getState().parts.get(id);
};
