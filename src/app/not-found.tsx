import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Invoice",
  description: "Invoice App | Page Not Found",
};

export default function Error404() {
  return (
    <main className="flex flex-col items-center justify-center py-32">
      <h1 className="font-bold text-xl">Page not found!</h1>
      <div className="font-medium">
        <Link href="/">Go back to home</Link>
      </div>
    </main>
  );
}
