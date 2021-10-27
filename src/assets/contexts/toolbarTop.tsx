import { listing } from 'components/ContextMenu/types/root';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';

const toolbarTop: listing = [
  {
    type: 'textButton',
    text: 'File',
    action: () => alert('nice'),
    icon: EyeIcon,
  },
  {
    type: 'textButton',
    text: 'Edit',
    action: () => alert('nice'),
  },
  {
    type: 'textButton',
    text: 'Selection',
    action: () => alert('nice'),
  },
  {
    type: 'textButton',
    text: 'View',
    action: () => alert('nice'),
  },
  {
    type: 'textButton',
    text: 'Help',
    action: () => alert('nice'),
  },
];

export default toolbarTop;
