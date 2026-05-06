import { ReactNode } from "react";

export default function PageHero({
  title,
  subtitle,
  bgImage,
  children,
}: {
  title: string;
  subtitle?: string;
  bgImage?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className="relative text-white"
      style={
        bgImage
          ? {
              backgroundImage: `linear-gradient(rgba(15,17,21,0.55), rgba(15,17,21,0.7)), url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : { background: "linear-gradient(135deg, #1f2937 0%, #0f1115 100%)" }
      }
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/90">{subtitle}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
