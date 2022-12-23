import useVersionControl from 'stores/versionControl';

export default function clearVersionControl() {
  useVersionControl.setState({ index: -1, history: [] });
}
