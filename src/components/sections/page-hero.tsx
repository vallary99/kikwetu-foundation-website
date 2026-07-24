import type { SiteImage } from "@/types/content";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: SiteImage;
  compact?: boolean;
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, description, compact, children }: PageHeroProps) {
  return (
    <section className={`kf-hero ${compact ? "py-5" : "py-6"}`} style={{ paddingBlock: compact ? "3.5rem" : "5.5rem" }}>
      <div className="container kf-hero-content">
        <div className="row">
          <div className="col-lg-8">
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h1 className="display-5 mb-3 hero-title text-capitalize">{title}</h1>
            <p className="hero-description mb-0">
              {description}
            </p>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
