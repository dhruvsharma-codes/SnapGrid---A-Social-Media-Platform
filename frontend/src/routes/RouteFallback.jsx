const Spinner = () => (
  <div
    role="status"
    aria-label="Loading"
    className="h-7 w-7 animate-spin rounded-full border-2 border-(--border) border-t-(--primary)"
  />
);

// whole screen (auth check, top-level pages)
export const FullScreenLoader = () => (
  <div className="flex min-h-dvh items-center justify-center bg-(--background) text-(--text-primary)">
    <Spinner />
  </div>
);

// inside the layout (navbar + sidebar stay visible)
export const PageLoader = () => (
  <div className="flex min-h-60 items-center justify-center">
    <Spinner />
  </div>
);