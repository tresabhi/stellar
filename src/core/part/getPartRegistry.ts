import usePartRegistry from 'stores/partRegistry';

export const getPartRegistry = (name: string) =>
  usePartRegistry.getState().get(name);
