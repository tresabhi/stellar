import { FC, ReactNode, useRef } from 'react';
import styles from '../index.module.scss';

export interface ContainerProps {
  children: ReactNode;
}
export const Container: FC<ContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if ((document.activeElement as HTMLElement)?.blur) {
      (document.activeElement as HTMLElement)?.blur();
    }
  };

  return (
    <div
      onClick={handleClick}
      ref={containerRef}
      className={styles['context-menu']}
    >
      {children}
    </div>
  );
};
