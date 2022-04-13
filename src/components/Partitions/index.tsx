import { FC, InputHTMLAttributes, ReactNode } from 'react';
import styles from './index.module.scss';

interface ContainerProps {
  children: ReactNode;
}
export const Container: FC<ContainerProps> = ({ children }) => (
  <div className={styles.partition}>{children}</div>
);

interface OptionProps extends InputHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}
export const Option: FC<OptionProps> = ({
  children,
  selected = false,
  ...props
}) => (
  //@ts-ignore
  <button
    className={`${styles.option} ${selected ? styles.selected : ''}`}
    {...props}
  >
    {children}
  </button>
);

export const Separator: FC = () => <div className={styles.separator} />;
