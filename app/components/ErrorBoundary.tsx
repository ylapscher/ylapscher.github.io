'use client';

import React from 'react';

/**
 * State interface for ErrorBoundary component.
 * @interface ErrorBoundaryState
 * @property {boolean} hasError - Indicates if an error has occurred
 * @property {Error} [error] - The error object if an error occurred
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Props interface for ErrorBoundary component.
 * @interface ErrorBoundaryProps
 * @property {React.ReactNode} children - Child components to render
 * @property {React.ReactNode} [fallback] - Optional custom fallback UI to display on error
 */
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Error boundary component that catches JavaScript errors in child components.
 * Displays a fallback UI instead of crashing the entire application.
 * @class ErrorBoundary
 * @extends {React.Component<ErrorBoundaryProps, ErrorBoundaryState>}
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /**
   * Creates an instance of ErrorBoundary.
   * @param {ErrorBoundaryProps} props - Component props
   */
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Updates state when an error is caught.
   * @param {Error} error - The error that was thrown
   * @returns {ErrorBoundaryState} Updated state with error information
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Logs error information when an error is caught.
   * @param {Error} error - The error that was thrown
   * @param {React.ErrorInfo} errorInfo - Additional error information
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Map component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="text-center p-8">
          <p className="text-gray-600 dark:text-gray-400">Unable to load interactive map. Please refresh the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
