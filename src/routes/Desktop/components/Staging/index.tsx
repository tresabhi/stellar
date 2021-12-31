import { FC, InputHTMLAttributes } from 'react';
import './index.scss';

const Staging: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props} className={`${props.className} staging-tab`}>
      <h1 className="title">Staging Coming Soon!</h1>
    </div>
  );
};

export default Staging;
