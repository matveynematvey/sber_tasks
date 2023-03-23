import React, { ErrorInfo } from 'react';

export interface IErrorBoundaryState {
    error: Error | null,
    errorInfo: ErrorInfo | null
}

class ErrorBoundary extends React.Component<React.PropsWithChildren<unknown>, IErrorBoundaryState> {
    constructor(props: React.PropsWithChildren<unknown>) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error:Error, errorInfo:ErrorInfo) {
        //TODO decide if need add error logging on the backend ?
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    Something went wrong
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
