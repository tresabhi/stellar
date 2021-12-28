import { FC, InputHTMLAttributes } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './index.scss';

const Scroller: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <SimpleBar {...props} className={`${props.className} scroller-simplebar`}>
    {children}
  </SimpleBar>
);

export default Scroller;
