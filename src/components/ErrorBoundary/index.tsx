import { ReactComponent } from 'assets/icons/warning-yellow.svg';
import Button from 'components/Button';
import { FC, useState } from 'react';
import {
  ErrorBoundary as ErrorBoundaryLib,
  FallbackProps,
} from 'react-error-boundary';
import blueprintStore from 'stores/blueprint';
import styles from './index.module.scss';

export const ErrorBoundaryFallback: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const [logVisible, setLogVisible] = useState(false);
  const hasUnsavedChanges = blueprintStore((state) => state.hasUnsavedChanges);

  const stack = error.stack?.split(' at ').map((string) => {
    return <span className={styles.child}>{string}</span>;
  });
  const URLParams = new URLSearchParams({
    title: `[Bug] ${error.name}`,
  }).toString();
  const reportURL = `https://github.com/TresAbhi/Stellar/issues/new?${URLParams}`;

  const handleDebugClick = () => setLogVisible((state) => !state);

  return (
    <div className={styles['error-boundary']}>
      <ReactComponent
        className={`${styles.icon} ${
          hasUnsavedChanges ? styles.unsafe : styles.safe
        }`}
      />
      <span className={styles.title}>
        {logVisible ? error.name : 'Stellar ran into an issue'}
      </span>
      {logVisible ? (
        []
      ) : (
        <span className={styles.body}>
          Your progress <u>was {hasUnsavedChanges ? 'not' : 'safely'} saved</u>
          in its latest state. Feel free to report this bug to Stellar while
          making sure you're the first one to do so.
        </span>
      )}
      <div className={styles['button-row']}>
        <Button onClick={resetErrorBoundary}>Restart</Button>
        <Button href={reportURL} target="_blank">
          Report
        </Button>
        <Button onClick={handleDebugClick}>
          {logVisible ? 'Hide' : ''} Debug
        </Button>
      </div>
    </div>
  );
};

const ErrorBoundary: FC = ({ children }) => {
  return (
    <ErrorBoundaryLib FallbackComponent={ErrorBoundaryFallback}>
      {children}
    </ErrorBoundaryLib>
  );
};
export default ErrorBoundary;
