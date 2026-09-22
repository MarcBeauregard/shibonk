import Nav from "./Nav";
import Footer from "./Footer";

/** Layout for the secondary pages: same chrome, a paper sheet for the content. */
export default function PageShell({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main id="main" className="halftone py-[clamp(40px,7vw,90px)]">
        <div className="wrap max-w-[900px]">
          <span className="tag">{eyebrow}</span>
          <h1 className="h2 mb-8">{title}</h1>
          <div className="card rounded-3xl p-[clamp(20px,4vw,40px)] shadow-pop">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
