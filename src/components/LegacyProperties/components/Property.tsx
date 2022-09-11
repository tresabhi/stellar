import useClipboard from 'hooks/useClipboard';
import { FC } from 'react';
import styles from '../index.module.scss';
import { Row } from './Row';

export interface PropertyProps {
  label: string;
  value: string;
  type?: 'full-width' | 'compact';
  copyable?: boolean;
}
export const Property: FC<PropertyProps> = ({
  label,
  value,
  type = 'compact',
  copyable = false,
}) => {
  const { copy } = useClipboard();

  const handleClick = () => {
    if (copyable) copy(value);
  };

  const Value = () => (
    <span
      className={`${styles['property-value']} ${
        copyable ? styles['copyable'] : ''
      }`}
      onClick={handleClick}
    >
      {value}
    </span>
  );

  return (
    <Row>
      <div className={`${styles.property} ${styles[`property-${type}`]}`}>
        <span className={styles['property-label']}>{label}</span>
        <Value />
      </div>
    </Row>
  );
};
