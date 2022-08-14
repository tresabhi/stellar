import useVersionControl from 'stores/useVersionControl';

export const clearVersionControl = () => {
  useVersionControl.setState({ index: -1, history: [] });
};
