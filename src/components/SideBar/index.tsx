import Scroller from 'components/ScrollableContainer';
import { FC, InputHTMLAttributes } from 'react';
import './index.scss';

interface ContainerProps extends InputHTMLAttributes<HTMLDivElement> {
  width?: 'major' | 'minor';
}
export const Container: FC<ContainerProps> = ({
  children,
  width = 'major',
  ...props
}) => (
  <div {...props} className={`${props.className ?? ''} side-bar ${width}`}>
    {children}
  </div>
);

export const Scrollable: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <Scroller className="side-bar-scrollable-scroller" {...props}>
    {children}
  </Scroller>
);
