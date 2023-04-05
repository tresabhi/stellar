import { GH_REPO_URL } from 'constants/sourceCode';
import useClipboard from 'hooks/useClipboard';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { deviceDetect } from 'react-device-detect';
import { StackFrame, fromError } from 'stacktrace-js';
import './index.css';

export interface FallbackProps {
  error: Error;
  reset: () => void;
}

const filePathRegex = /^.*[\\/]/;

/**
 * Minimal dependencies here to avoid further errors.
 */
export default function Fallback({ error, reset }: FallbackProps) {
  // TODO: use react use hook later
  const stacks = useRef<HTMLDivElement>(null);
  const { copy } = useClipboard();
  const [traced, setTraced] = useState(false);
  const [stackFrames, setStackFrames] = useState<StackFrame[]>([]);
  const [failed, setFailed] = useState(false);

  const formattedStack = stackFrames.map(
    (stackFrame) =>
      `${stackFrame.functionName} (${stackFrame.fileName?.replace(
        filePathRegex,
        '',
      )}:${stackFrame.lineNumber}:${stackFrame.columnNumber})`,
  );

  useEffect(() => {
    fromError(error)
      .then((frames) => {
        setStackFrames(frames);
        setTraced(true);
      })
      .catch(() => {
        setFailed(true);
      });
  }, [error]);

  return (
    <div className="fallback">
      <span className="title">Stellar ran into a critical issue!</span>

      <div className="stacks-wrapper">
        <div className="stacks" ref={stacks}>
          <span className="stack">
            {error.name}: {error.message}
          </span>

          <br />

          {traced &&
            !failed &&
            stackFrames.map((stackFrame) => (
              <span className="stack">
                {stackFrame.functionName} (
                <a
                  className="stack-anchor"
                  href={stackFrame.fileName}
                  target="_blank"
                  rel="noreferrer"
                >
                  {stackFrame.fileName?.replace(filePathRegex, '')}:
                  {stackFrame.lineNumber}:{stackFrame.columnNumber}
                </a>
                )
              </span>
            ))}
          {failed && (
            <span className="stack">
              Stellar ran into an issue parsing the error. Double whammy!
            </span>
          )}
          {!traced && !failed && (
            <span className="stack">Parsing stack...</span>
          )}
        </div>
      </div>

      <div className="actions">
        <button
          className="action"
          type="button"
          onClick={() => copy(`${stacks.current?.innerText}`)}
        >
          Copy
        </button>
        <button className="action" type="button" onClick={reset}>
          Reset
        </button>
        <button
          className="action"
          type="button"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
        <button
          className="action"
          type="button"
          onClick={() => {
            const deviceInfo = {
              ...deviceDetect(undefined),

              formatVersion: 2,
              locale: moment().locale(),
              time: moment().format('h:mm:ss a, MMMM Do, YYYY'),
            };
            const deviceInfoStringified = Object.keys(deviceInfo)
              .map((key) => `${key}: ${deviceInfo[key]}`)
              .join('\n');

            const title = `${error.name}: ${error.message}`;
            const about =
              '# About\n\n<REPLACE ME WITH INFORMATION ABOUT WHAT HAPPENED>';
            const reproduce =
              '# Reproduce\n\n<REPLACE ME WITH INFORMATION ON HOW TO REPRODUCE THIS ISSUE>';
            const message = `# Message\n\n\`\`\`\n${error.message}\n\`\`\``;
            const stackReport = `# Stack\n\n\`\`\`\n${formattedStack.join(
              '\n',
            )}\n\`\`\``;
            const otherInfo = `# Other Info\n\n\`\`\`\n${deviceInfoStringified}\n\`\`\``;

            const params = new URLSearchParams({
              title,
              body: `${about}\n\n${reproduce}\n\n${message}\n\n${stackReport}\n\n${otherInfo}`,
            }).toString();
            window.open(`${GH_REPO_URL}issues/new?${params}`);
          }}
        >
          Report
        </button>
      </div>
    </div>
  );
}
