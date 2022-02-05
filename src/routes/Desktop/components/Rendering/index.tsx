import { FC, InputHTMLAttributes } from 'react';
import styles from './index.module.scss';

const Rendering: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      {...props}
      className={`${props.className ?? ''} ${styles['rendering-tab']}`}
    >
      <h1 className={styles.title}>Rendering Coming Soon!</h1>
    </div>
  );
};

export default Rendering;
