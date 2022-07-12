import useApp from 'hooks/useApp';

export const declareUnsavedChanges = () => {
  useApp.setState({ hasUnsavedChanges: true });
};
