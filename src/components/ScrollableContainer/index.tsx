import { FC, InputHTMLAttributes } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './index.scss';

const ScrollableContainer: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <SimpleBar
    {...props}
    className={`${props.className || ''} scrollable-container`}
  >
    {children}
  </SimpleBar>
);

export default ScrollableContainer;
