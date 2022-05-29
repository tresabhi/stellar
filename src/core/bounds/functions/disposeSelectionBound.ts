import useBounds from 'hooks/useBounds';

export const disposeSelectionBound = () => {
  useBounds.setState({ selection: null });
};
