import useBoundingBoxes from 'hooks/useBoundingBoxes';

export const discardSelectionBoundingBox = () => {
  useBoundingBoxes.setState({ selectionBound: null });
};
