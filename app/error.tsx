"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
      <p>Something went wrong. Please try again later.</p>
      <button
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
