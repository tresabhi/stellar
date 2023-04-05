import { Component, ReactNode } from 'react';
import Fallback from './components/Fallback';

export interface WrapperProps {
  children?: ReactNode;
}

export interface WrapperState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<
  WrapperProps,
  WrapperState
> {
  constructor(props: WrapperProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): WrapperState {
    return { hasError: true, error };
  }

  public render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError)
      return (
        <Fallback
          error={error as Error}
          reset={() => this.setState({ hasError: false, error: undefined })}
        />
      );
    return children;
  }
}
