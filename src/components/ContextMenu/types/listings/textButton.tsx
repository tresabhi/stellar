import root, { listing } from './root';

type textButton = root & {
  type: 'textButton';
  text: string;
  action: Function | listing;
};

export default textButton;
