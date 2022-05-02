import { TriangleRightIcon } from '@radix-ui/react-icons';
import { FC, ReactNode } from 'react';
import styles from '../index.module.scss';

interface ExtensionProps {
  disabled?: boolean;
  label: string;
  children: ReactNode;
}
export const Extension: FC<ExtensionProps> = ({
  children,
  disabled = false,
  label: title,
}) => {
  return (
    <div
      className={`${styles['extension-button']} ${
        disabled ? styles.disabled : styles.enabled
      }`}
    >
      <span className={styles.text}>{title}</span>
      <div className={styles['icon-holder']}>
        <TriangleRightIcon className={styles.icon} />
      </div>
      {children ? (
        <div className={styles.extension}>{children}</div>
      ) : undefined}
    </div>
  );
};
