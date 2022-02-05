import { FC, InputHTMLAttributes } from 'react';
import styles from './index.module.scss';

const Simulation: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      {...props}
      className={`${props.className ?? ''} ${styles['simulation-tab']}`}
    >
      <h1 className={styles.title}>Simulation Coming Soon!</h1>
    </div>
  );
};

export default Simulation;
