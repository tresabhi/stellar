import { FC } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './index.scss';

export interface ScrollableLegacyProps extends SimpleBar.Props {}
const ScrollableLegacy: FC<ScrollableLegacyProps> = ({
  children,
  ...props
}) => {
  return <SimpleBar {...props}>{children}</SimpleBar>;
};
export default ScrollableLegacy;
