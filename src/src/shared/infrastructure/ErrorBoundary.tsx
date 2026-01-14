import React, { Component, ErrorInfo, ReactNode } from "react";

import Button from "@mui/material/Button";

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Zobrazí chybu na stránce, pokud dojde k chybě uvnitř ErroBoundary komponentě
 * @returns Název a popis chyby
 */

class ErrorBoundary extends Component<IProps, IState> {
  public state: IState = {
    hasError: false,

    error: new Error(),

    errorInfo: { componentStack: "" },
  };

  public static getDerivedStateFromError(error: Error): IState {
    // Update state so the next render will show the fallback UI.

    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);

    this.setState({
      error: error,

      errorInfo: errorInfo,
    });
  }

  reloadComponent = () => {
    this.setState({
      hasError: false,
    });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <h2>Something went wrong.</h2>

          <p>
            <strong>Error name: </strong>
            {!!this.state.error ? this.state.error.name : ""}
          </p>

          <p>
            <strong>Error description: </strong>
            {!!this.state.error ? this.state.error.message : ""}
          </p>

          <Button
            variant='contained'
            color='secondary'
            onClick={this.reloadComponent}
          >
            Reload section
          </Button>
        </React.Fragment>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
