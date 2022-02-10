export type UndefinedRefObject<T> = {
  current: T | undefined;
};

export type UseUndefinedRef = <T>(initialValue?: T) => UndefinedRefObject<T>;

const useUndefinedRef: UseUndefinedRef = (initialValue) => {
  return {
    current: initialValue,
  };
};
export default useUndefinedRef;
