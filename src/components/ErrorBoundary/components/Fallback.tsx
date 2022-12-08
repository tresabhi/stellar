import {
  CodeIcon,
  CounterClockwiseClockIcon,
  EnvelopeClosedIcon,
  ExclamationTriangleIcon,
  ResetIcon,
} from '@radix-ui/react-icons';
import { Button as ButtonPrimitive } from 'components/Button';
import { mutateSettings } from 'core/app';
import moment from 'moment';
import {
  FC,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { deviceDetect } from 'react-device-detect';
import { FallbackProps as FallbackPrimitiveProps } from 'react-error-boundary';
import { mapStackTrace } from 'sourcemapped-stacktrace';
import { styled, theme } from 'stitches.config';
import useSettings from 'stores/settings';

export interface FallbackProps
  extends FallbackPrimitiveProps,
    HTMLAttributes<HTMLDivElement> {}

const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space.gapUnrelatedMajor,
  backgroundColor: theme.colors.appBackground1,
  padding: theme.space.paddingMajor,
});

const InfoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapRelatedMajor,
  maxWidth: theme.sizes.errorScreenInfoMaxWidth,
});

const Title = styled('span', {
  fontSize: theme.fontSizes[16],
  color: theme.colors.textLowContrast_error,
  display: 'flex',
  gap: theme.space.gapRelated,
  alignItems: 'center',
  justifyContent: 'center',

  '& > svg': {
    width: '1em',
    height: '1em',
  },

  variants: {
    mono: {
      true: {
        fontFamily: theme.fonts.mono,
        userSelect: 'text',
      },
    },
  },
});

const ButtonsRow = styled('div', {
  display: 'flex',
  gap: theme.space.gapRelatedMajor,
});

const SubTitleInfo = styled('span', {
  fontSize: theme.fontSizes[12],
  color: theme.colors.textLowContrast,
  textAlign: 'center',
});

const Button = styled(ButtonPrimitive, {
  padding: theme.space.paddingMinor,
  fontSize: theme.fontSizes[12],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space.gapRelated,
  borderRadius: theme.radii[4],

  '& > svg': {
    width: '1em',
    height: '1em',
  },

  defaultVariants: {
    border: true,
  },
});

const DebugInfoContainer = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space.gapRelatedMajor,
});

const DebugInfo = styled('div', {
  flex: 1,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: theme.sizes.errorScreenDebugInfoMaxWidth,
  maxHeight: theme.sizes.errorScreenDebugInfoMaxHeight,
  gap: theme.space.gapRelatedMajor,
});

const DebugTitle = styled('span', {
  color: theme.colors.textHighContrast,
  fontSize: theme.fontSizes[12],
  fontFamily: theme.fonts.mono,
});

const DebugContentContainer = styled('div', {
  flex: 1,
  height: '100%',
  overflow: 'auto',
  backgroundColor: theme.colors.appBackground2,
  border: theme.borderStyles.componentNonInteractive,
  padding: theme.space.padding,
  borderRadius: theme.radii[4],
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapRelated,
});

const DebugContent = styled('span', {
  flex: '1',
  userSelect: 'text',
  fontFamily: theme.fonts.mono,
  color: theme.colors.textLowContrast,
  fontSize: theme.fontSizes[10],
  whiteSpace: 'nowrap',
});

export const Fallback: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
  ...props
}) => {
  const debug = useSettings((state) => state.debug.errorScreen.showDebug);
  const rawStack = useRef(
    error.stack === undefined
      ? 'No stack provided'
      : error.stack
          .split(' at ')
          .filter((value, index) => index !== 0)
          .map((value) => `at ${value}`),
  );
  // alert(location.origin);
  const [stack, setStack] = useState<ReactNode>(
    <DebugContent>Mapping...</DebugContent>,
  );
  const [mapped, setMapped] = useState(false);

  if (error.message.length === 0) error.message = 'No message provided';

  const handleRefreshClick = () => resetErrorBoundary();
  const handleRestartClick = () => window.location.reload();
  const handleReportClick = () => {
    const deviceInfo = {
      ...deviceDetect(undefined),

      format_version: 1,
      locale: moment.locale(),
      date: moment().format('MMMM Do, YYYY'),
      time: moment().format('h:mm:ss a'),
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
    const stackReport = `# Stack\n\n\`\`\`\n${
      typeof rawStack.current === 'string'
        ? rawStack.current
        : rawStack.current.join('\n')
    }\n\`\`\``;
    const otherInfo = `# Other Info\n\n\`\`\`\n${deviceInfoStringified}\n\`\`\``;

    const params = new URLSearchParams({
      title,
      body: `${about}\n\n${reproduce}\n\n${message}\n\n${stackReport}\n\n${otherInfo}`,
    }).toString();
    const report = `https://github.com/tresabhi/stellar/issues/new?${params}`;

    window.open(report, '_blank');
  };
  const handleDebugClick = () => {
    mutateSettings((draft) => {
      draft.debug.errorScreen.showDebug = !draft.debug.errorScreen.showDebug;
    });
  };

  useEffect(() => {
    mapStackTrace(error.stack, (mappedStackRaw) => {
      rawStack.current = mappedStackRaw
        .map((stackItem) => stackItem.trim())
        .filter((item) => !item.includes('react-reconciler'));

      setStack(
        rawStack.current.map((stackItem) => (
          <DebugContent>
            {stackItem
              .replace(`${location.origin}/`, '')
              .replace(/\?[a-zA-Z]=(.*?):/, ':')
              .replace('at ', '')}
          </DebugContent>
        )),
      );
      setMapped(true);
    });
  });

  // TODO: translate this

  return (
    <Container {...props}>
      <InfoContainer>
        <Title mono={debug}>
          <ExclamationTriangleIcon />{' '}
          {debug ? error.name : 'Stellar Ran Into an Issue'}
        </Title>

        {!debug && (
          <SubTitleInfo>
            An error terminated Stellar. Pressing Refresh will not dispose of
            your latest changes; however, Restart will. A restart will likely
            fix any errors that a refresh cannot. Feel free to press the Report
            button to create a new issue with most of the information filled in.
          </SubTitleInfo>
        )}
      </InfoContainer>

      {debug && (
        <DebugInfoContainer>
          <DebugInfo>
            <DebugTitle>Message</DebugTitle>
            <DebugContentContainer>
              <DebugContent>{error.message}</DebugContent>
            </DebugContentContainer>
          </DebugInfo>

          <DebugInfo>
            <DebugTitle>{`Stack${mapped ? '' : ' (Mapping...)'}`}</DebugTitle>
            <DebugContentContainer>{stack}</DebugContentContainer>
          </DebugInfo>
        </DebugInfoContainer>
      )}

      <ButtonsRow>
        <Button onClick={handleRefreshClick}>
          <CounterClockwiseClockIcon /> Refresh
        </Button>
        <Button onClick={handleRestartClick}>
          <ResetIcon /> Restart
        </Button>
        <Button onClick={handleReportClick}>
          <EnvelopeClosedIcon /> Report
        </Button>
        <Button onClick={handleDebugClick} color={debug ? 'accent' : undefined}>
          <CodeIcon /> Debug
        </Button>
      </ButtonsRow>
    </Container>
  );
};
