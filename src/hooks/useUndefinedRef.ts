export type UseUndefinedRefObject<T> = {
  current: T | undefined;
};

export type UseUndefinedRef = <T>(initialValue?: T) => UseUndefinedRefObject<T>;

const useUndefinedRef: UseUndefinedRef = (initialValue) => {
  return {
    current: initialValue,
  };
};
export default useUndefinedRef;
