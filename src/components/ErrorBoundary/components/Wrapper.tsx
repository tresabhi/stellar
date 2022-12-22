import { FC, HTMLAttributes } from 'react';
import {
  ErrorBoundary,
  FallbackProps as FallbackPrimitiveProps,
} from 'react-error-boundary';
import { Fallback } from './Fallback';

export const Wrapper: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  function StyledFallback(fallbackProps: FallbackPrimitiveProps) {
    return <Fallback {...fallbackProps} {...props} />;
  }

  return (
    <ErrorBoundary FallbackComponent={StyledFallback}>{children}</ErrorBoundary>
  );
};
