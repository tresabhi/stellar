import { FC, ReactNode } from 'react';
import { ErrorBoundary as ErrorBoundaryLib } from 'react-error-boundary';
import { FallbackLegacy } from './Fallback';

export interface WrapperLegacyProps {
  children: ReactNode;
}
export const WrapperLegacy: FC<WrapperLegacyProps> = ({ children }) => {
  return (
    <ErrorBoundaryLib FallbackComponent={FallbackLegacy}>
      {children}
    </ErrorBoundaryLib>
  );
};
