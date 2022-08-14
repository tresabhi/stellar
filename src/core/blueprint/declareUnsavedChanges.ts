import useApp from 'stores/useApp';

export const declareUnsavedChanges = () => {
  useApp.setState({ hasUnsavedChanges: true });
};
