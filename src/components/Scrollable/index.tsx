import { FC } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './index.scss';

export interface ScrollableProps extends SimpleBar.Props {}
const Scrollable: FC<ScrollableProps> = ({ children, ...props }) => {
  return <SimpleBar {...props}>{children}</SimpleBar>;
};
export default Scrollable;
