import { FC, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from './Fallback';

export interface WrapperProps {
  children: ReactNode;
}

export const Wrapper: FC<WrapperProps> = ({ children }) => (
  <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>
);
