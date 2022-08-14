import usePartRegistry from 'stores/usePartRegistry';

export const getPartRegistry = (name: string) =>
  usePartRegistry.getState().get(name);
