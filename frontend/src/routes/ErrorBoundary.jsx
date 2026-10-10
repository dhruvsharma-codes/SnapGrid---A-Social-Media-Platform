import { Component } from "react";

// One crashing component (or a page chunk that failed to download, e.g. right
// after a new deploy) used to blank the entire app. Now it shows a recovery screen.
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("App error:", error);
  }

  // navigating to another page clears the error
  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-(--background) px-4 text-center text-(--text-primary)">
        <h1 className="text-xl font-bold">Something went wrong</h1>

        <p className="max-w-sm text-sm text-(--text-secondary)">
          The page failed to load. Reloading usually fixes it.
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-(--primary-hover)"
        >
          Reload
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;