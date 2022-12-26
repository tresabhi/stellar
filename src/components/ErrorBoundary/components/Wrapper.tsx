import { ReactNode } from 'react';
import {
  ErrorBoundary,
  FallbackProps as FallbackPrimitiveProps,
} from 'react-error-boundary';
import Fallback from './Fallback';

export interface WrapperProps {
  children: ReactNode;
}

function StyledFallback(fallbackProps: FallbackPrimitiveProps) {
  return <Fallback {...fallbackProps} />;
}

export function Wrapper({ children }: WrapperProps) {
  return (
    <ErrorBoundary FallbackComponent={StyledFallback}>{children}</ErrorBoundary>
  );
}
