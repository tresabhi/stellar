import boundsStore from 'stores/bounds';

export const translateAllBoundingBoxes = (x: number, y: number) => {
  for (const id in boundsStore) {
    const { bounds } = boundsStore[id];
    bounds.x += x;
    bounds.y += y;
  }
};
