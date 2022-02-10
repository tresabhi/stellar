import { useState } from 'react';

export type UseRerenderHook = () => void;

export type UseRerender = () => UseRerenderHook;

const useRerender: UseRerender = () => {
  const [state, setState] = useState<number>(0);

  const hook = () => setState(1);

  return hook;
};
export default useRerender;
