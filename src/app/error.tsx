"use client";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black/80 text-white">
      <div className="text-center space-y-4 p-8">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-gray-400">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-white/20 px-6 py-2 text-white backdrop-blur-sm transition hover:bg-white/30"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
