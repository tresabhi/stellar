import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { listing } from 'components/ContextMenu/types/root';

const toolbarBenchmark: listing = [
  {
    type: 'text_button',
    onClick: () => alert('Woo! You clicked me!'),
    text: 'Click me :)',
  },
];

export default toolbarBenchmark;
