import ScrollableLegacy from 'components/ScrollableLegacy';
import { FC, InputHTMLAttributes } from 'react';
import styles from './index.module.scss';

const TextAreaLegacy: FC<InputHTMLAttributes<HTMLTextAreaElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <ScrollableLegacy>
      <textarea {...props} className={`${styles.textarea} ${className ?? ''}`}>
        {children}
      </textarea>
    </ScrollableLegacy>
  );
};
export default TextAreaLegacy;
