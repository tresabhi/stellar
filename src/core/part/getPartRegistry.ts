import usePartRegistry from 'hooks/usePartRegistry';

export const getPartRegistry = (name: string) =>
  usePartRegistry.getState().get(name);
