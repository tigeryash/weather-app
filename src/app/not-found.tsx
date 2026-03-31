import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black/80 text-white">
      <div className="text-center space-y-4 p-8">
        <h2 className="text-2xl font-semibold">Page not found</h2>
        <p className="text-gray-400">
          The page you are looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-white/20 px-6 py-2 text-white backdrop-blur-sm transition hover:bg-white/30"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
