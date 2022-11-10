import useVersionControl from 'stores/versionControl';

export const clearVersionControl = () => {
  useVersionControl.setState({ index: -1, history: [] });
};
