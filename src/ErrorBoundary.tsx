import { Component, type ErrorInfo, type ReactNode } from "react";

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, message: string}> {
    state: Readonly<{ hasError: boolean; message:string}> = {
        hasError: false,
        message: "",
    };

    static getDerivedStateFromError (_: Error): {hasError: boolean} {
        return {hasError: true}
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({message: `${error}:  ${errorInfo}`});
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <>
                    <div>
                        <h2>Something went wrong...T.T</h2>
                    </div>
                    <button onClick={() => this.setState({hasError: false, message: "",})}>
                        Reset error
                    </button>
                </>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;