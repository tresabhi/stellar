import { FC, InputHTMLAttributes } from 'react';
import './index.scss';

const Rendering: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props} className={`${props.className ?? ''} rendering-tab`}>
      <h1 className="title">Rendering Coming Soon!</h1>
    </div>
  );
};

export default Rendering;
