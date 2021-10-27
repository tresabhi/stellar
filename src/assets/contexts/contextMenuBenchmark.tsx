import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { listing } from 'components/ContextMenu/types/root';

const contextMenuBenchmark: listing = [
  {
    type: 'textButton',
    action: () => alert('Woo! You clicked me!'),
    text: 'Click me',
  },
  {
    type: 'textButton',
    action: () => alert('Woo! You clicked me!'),
    text: 'Same thing as above, but with an icon',
    icon: EyeIcon,
  },
];

export default contextMenuBenchmark;
