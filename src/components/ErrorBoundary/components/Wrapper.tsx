import { FC, ReactNode } from 'react';
import { ErrorBoundary as ErrorBoundaryLib } from 'react-error-boundary';
import { Fallback } from './Fallback';

export interface WrapperProps {
  children: ReactNode;
}
export const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <ErrorBoundaryLib FallbackComponent={Fallback}>{children}</ErrorBoundaryLib>
  );
};
