import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Study Hub render error:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            fontFamily: "system-ui,sans-serif",
            background: "var(--error-bg)",
            color: "var(--app-text)",
          }}
        >
          <div
            style={{
              maxWidth: 480,
              background: "var(--app-surface)",
              border: "1.5px solid var(--error-border)",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <h1 style={{ fontSize: 16, color: "var(--error-title)", margin: "0 0 8px" }}>Something went wrong</h1>
            <p style={{ fontSize: 13, color: "var(--error-text)", margin: "0 0 12px", lineHeight: 1.5 }}>
              The app hit a runtime error. Open the browser console (F12) for details.
            </p>
            <pre
              style={{
                fontSize: 11,
                color: "var(--error-code-text)",
                background: "var(--error-code-bg)",
                padding: 12,
                borderRadius: 6,
                overflow: "auto",
                margin: 0,
                whiteSpace: "pre-wrap",
              }}
            >
              {this.state.error.message}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
