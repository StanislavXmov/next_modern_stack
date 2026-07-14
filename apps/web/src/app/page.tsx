import { PageWrapper } from "@/modules/shared/page-wrapper";
import Link from "next/link";

export default function Home() {
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold text-white">Welcome to our App</h1>
      <Link
        href="/terminal"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded inline-block"
      >
        Enter
      </Link>
    </PageWrapper>
  );
}
