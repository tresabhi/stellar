import useVersionControl from 'hooks/useVersionControl';

export const clearVersionControl = () => {
  useVersionControl.setState({ index: -1, history: [] });
};
