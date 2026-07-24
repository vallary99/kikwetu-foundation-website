interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, description, align = "left", light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-4 mb-lg-5 ${align === "center" ? "text-center mx-auto" : ""}`} style={align === "center" ? { maxWidth: "42rem" } : undefined}>
      {eyebrow ? <p className={`eyebrow ${light ? "eyebrow-light" : ""} mb-3 ${align === "center" ? "justify-content-center" : ""}`}>{eyebrow}</p> : null}
      <h2 className={`h1 mb-3 ${light ? "text-white" : ""}`}>{title}</h2>
      {description ? (
        <p className={`lead mb-0 ${light ? "" : "text-secondary"}`} style={light ? { color: "rgba(255,255,255,0.85)" } : undefined}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
