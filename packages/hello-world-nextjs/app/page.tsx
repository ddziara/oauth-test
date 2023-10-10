import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Title of my page",
};

export default function Page() {
  return (
    <>
      <Link href="/dashboard">Dashboard</Link>
      <h1>Hello, Next.js 2!</h1>
    </>
  );
}
