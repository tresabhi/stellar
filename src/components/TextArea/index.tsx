import Scrollable from 'components/Scrollable';
import { FC, InputHTMLAttributes } from 'react';

const TextArea: FC<InputHTMLAttributes<HTMLTextAreaElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Scrollable>
      {/* <textarea {...props} className={`${styles.textarea} ${className ?? ''}`}> */}
      {children}
      {/* </textarea> */}
    </Scrollable>
  );
};
export default TextArea;
