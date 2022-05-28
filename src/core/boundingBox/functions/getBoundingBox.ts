import useBoundingBoxes from 'hooks/useBoundingBoxes';

export const getBoundingBox = (id: string) => {
  return useBoundingBoxes.getState().partBounds.get(id);
};
