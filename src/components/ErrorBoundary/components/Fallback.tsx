import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Button from 'components/Button';
import TextArea from 'components/TextArea';
import produce from 'immer';
import moment from 'moment';
import { FC } from 'react';
import { deviceDetect } from 'react-device-detect';
import { FallbackProps } from 'react-error-boundary';
import settingsStore, { SettingsStore } from 'stores/settings';
import styles from '../index.module.scss';

const MESSAGE_MAX_LENGTH = 75;

export const Fallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const logVisible = settingsStore((state) => state.debug.error_logs);
  const slicedMessage = error.message.slice(0, MESSAGE_MAX_LENGTH - 1);
  const ellipses = error.message.length > MESSAGE_MAX_LENGTH ? '...' : '';
  const deviceInfo = {
    format_version: 1,
    locale: moment.locale(),
    date: moment().format('MMMM Do, YYYY'),
    time: moment().format('h:mm:ss a'),
    ...deviceDetect(undefined),
  };
  const deviceInfoStringified = Object.keys(deviceInfo)
    .map((key) => {
      const value = deviceInfo[key];
      return `${key}: ${value}`;
    })
    .join('\n');
  const URLParams = new URLSearchParams({
    title: `[Bug] ${error.name}: ${slicedMessage}${ellipses}`,
    body: `## About\n<REPLACE ME WITH INFORMATION ABOUT WHAT HAPPENED>\n\n## Reproduce\n<REPLACE ME WITH INFORMATION ON HOW TO REPRODUCE THIS ISSUE>\n\n## Error\n\`\`\`\n${
      error.message
    }\n\`\`\`${
      error.stack ? `\n\n## Stack\n\`\`\`\n${error.stack}\n\`\`\`` : ''
    }\n\n## Other Info\n\`\`\`\n${deviceInfoStringified}\n\`\`\``,
  }).toString();
  const reportURL = `https://github.com/TresAbhi/Stellar/issues/new?${URLParams}`;

  const handleDebugClick = () =>
    settingsStore.setState(
      produce((state: SettingsStore) => {
        state.debug.error_logs = !state.debug.error_logs;
      }),
    );

  return (
    <div className={styles['error-boundary']}>
      <ExclamationTriangleIcon className={styles.icon} />
      <span className={styles.title}>
        {logVisible ? error.name : 'Stellar ran into an issue'}
      </span>
      {logVisible ? (
        [
          <TextArea className={styles.debug} key="error-message">
            {error.message}
          </TextArea>,
          error.stack ? (
            <TextArea className={styles.debug} key="error-stack">
              {error.stack}
            </TextArea>
          ) : null,
        ]
      ) : (
        <span className={styles.body}>
          Your progress is saved in it's latest state, however, can be discarded
          if it's causing the issue. Feel free to report this bug to Stellar
          while making sure you're the first one to do so.
        </span>
      )}
      <div className={styles['button-row']}>
        <Button onClick={resetErrorBoundary}>Restart</Button>
        <Button onClick={window.location.reload}>
          Restart without progress
        </Button>
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
