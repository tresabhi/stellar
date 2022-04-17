import { AnyPartMap } from 'types/Parts';

const comparePartsMap = (prevState: AnyPartMap, nextState: AnyPartMap) => {
  const prevKeys = prevState.keys();
  const nextKeys = nextState.keys();

  let isPrevKeyDone = false;
  let isNextKeyDone = false;

  while (!isPrevKeyDone || !isNextKeyDone) {
    const prevKey = prevKeys.next();
    const nextKey = nextKeys.next();

    isPrevKeyDone = prevKey.done!;
    isNextKeyDone = nextKey.done!;

    if (prevKey.done !== nextKey.done) return false;
    if (prevKey.value !== nextKey.value) return false;
  }

  return true;
};
export default comparePartsMap;
