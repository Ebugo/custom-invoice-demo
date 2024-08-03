"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { refresh } = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center py-32">
      <h1 className="font-bold text-xl">Something went wrong!</h1>
      <div className="font-medium">
        Please{" "}
        <div className="font-medium text-[var(--green-11)]">
          <Link
            href="#"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            try again
          </Link>
        </div>{" "}
        ,{" "}
        <div className="font-medium text-[var(--green-11)]">
          <Link href="#" onClick={() => refresh()}>
            reload
          </Link>
        </div>{" "}
        or
        <div className="font-medium text-[var(--green-11)]">
          <Link href="/">go back to home</Link>
        </div>
      </div>
    </main>
  );
}
