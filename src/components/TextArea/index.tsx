import { FC, InputHTMLAttributes } from 'react';
import styles from './index.module.scss';

const TextArea: FC<InputHTMLAttributes<HTMLTextAreaElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <textarea {...props} className={`${styles.textarea} ${className ?? ''}`}>
      {children}
    </textarea>
  );
};
export default TextArea;
