import boundsStore from 'stores/bounds';

export default function disposeBounds(ids: string[]) {
  ids.forEach((id) => delete boundsStore[id]);
}
