import { FC, InputHTMLAttributes } from 'react';
import styles from './index.module.scss';

const Export: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      {...props}
      className={`${props.className ?? ''} ${styles['export-tab']}`}
    >
      <h1 className={styles.title}>Export Coming Soon!</h1>
    </div>
  );
};

export default Export;
