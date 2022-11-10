import boundsStore from 'stores/bounds';

export const disposeBounds = (ids: string[]) => {
  ids.forEach((id) => delete boundsStore[id]);
};
