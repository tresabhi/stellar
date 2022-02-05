import { FC, InputHTMLAttributes } from 'react';
import styles from './index.module.scss';

const Staging: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      {...props}
      className={`${props.className ?? ''} ${styles['staging-tab']}`}
    >
      <h1 className={styles.title}>Staging Coming Soon!</h1>
    </div>
  );
};

export default Staging;
