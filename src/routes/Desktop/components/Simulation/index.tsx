import { FC, InputHTMLAttributes } from 'react';
import './index.scss';

const Simulation: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props} className={`${props.className || ''} simulation-tab`}>
      <h1 className="title">Simulation Coming Soon!</h1>
    </div>
  );
};

export default Simulation;
