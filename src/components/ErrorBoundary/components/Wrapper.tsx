import { FC, HTMLAttributes } from 'react';
import {
  ErrorBoundary,
  FallbackProps as FallbackPrimitiveProps
} from 'react-error-boundary';
import { Fallback } from './Fallback';

export const Wrapper: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  const StyledFallback = (fallbackProps: FallbackPrimitiveProps) => (
    <Fallback {...fallbackProps} {...props} />
  );

  return (
    <ErrorBoundary FallbackComponent={StyledFallback}>{children}</ErrorBoundary>
  );
};
