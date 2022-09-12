import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import ButtonLegacy from 'components/ButtonLegacy';
import TextAreaLegacy from 'components/TextAreaLegacy';
import { mutateSettings } from 'core/app';
import moment from 'moment';
import { FC } from 'react';
import { deviceDetect } from 'react-device-detect';
import { FallbackProps } from 'react-error-boundary';
import useSettings from 'stores/useSettings';
import styles from '../index.module.scss';

const MESSAGE_MAX_LENGTH = 75;

export const FallbackLegacy: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const logVisible = useSettings((state) => state.debug.error_logs);
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
  const reportURL = `https://github.com/tresabhi/stellar/issues/new?${URLParams}`;

  const handleDebugClick = () => {
    mutateSettings((draft) => {
      draft.debug.error_logs = !draft.debug.error_logs;
    });
  };

  return (
    <div className={styles['error-boundary']}>
      <ExclamationTriangleIcon className={styles.icon} />
      <span className={styles.title}>
        {logVisible ? error.name : 'Stellar ran into an issue'}
      </span>
      {logVisible ? (
        [
          <TextAreaLegacy className={styles.debug} key="error-message">
            {error.message}
          </TextAreaLegacy>,
          error.stack ? (
            <TextAreaLegacy className={styles.debug} key="error-stack">
              {error.stack}
            </TextAreaLegacy>
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
        <ButtonLegacy onClick={resetErrorBoundary}>Restart</ButtonLegacy>
        <ButtonLegacy onClick={window.location.reload}>
          Restart without progress
        </ButtonLegacy>
        <ButtonLegacy href={reportURL} target="_blank">
          Report
        </ButtonLegacy>
        <ButtonLegacy onClick={handleDebugClick}>
          {logVisible ? 'Hide' : ''} Debug
        </ButtonLegacy>
      </div>
    </div>
  );
};
