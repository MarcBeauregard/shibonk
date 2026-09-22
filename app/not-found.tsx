import Link from "next/link";
import ShibaHead from "@/components/ShibaHead";

export default function NotFound() {
  return (
    <main id="main" className="halftone grid min-h-dvh place-items-center bg-sky py-16">
      <div className="wrap text-center">
        <ShibaHead className="mx-auto block w-40 -rotate-12" />
        <p className="tag mt-6">Error 404</p>
        <h1 className="h2">Nothing to bonk here.</h1>
        <p className="mx-auto mb-8 max-w-[40ch]">This page doesn&apos;t exist, or it got bonked so hard it left the internet.</p>
        <Link href="/" className="btn">
          Back to the pack
        </Link>
      </div>
    </main>
  );
}
