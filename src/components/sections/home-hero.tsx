import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="kf-hero">
      <div className="kf-hero-media">
        <Image
          src="/images/kikwetu-foundation-youth-community-gathering.jpg"
          alt="Kikwetu Foundation youth and volunteers gathered together outdoors in Nairobi"
          fill
          sizes="(max-width: 767px) 0px, 100vw"
          className="kf-object-fit"
        />
      </div>
      <div className="container kf-hero-content kf-hero-pad">
        <div className="row">
          <div className="col-lg-9">
            <p className="eyebrow eyebrow-light mb-3">Youth Empowerment NGO · Kenya</p>
            <h1 className="display-4 mb-3 mb-md-4 home-hero-bg fw-bold">
              Transforming African Youth Through Opportunity, Skills & Education
            </h1>
            <p className="lead mb-4" style={{ color: "rgba(255,255,255,0.9)", maxWidth: "42rem" }}>
              Since 2012, Kikwetu Foundation has equipped young people across Kenya with
              mentorship, digital skills, and entrepreneurial opportunity, reaching over
              10,000 beneficiaries and counting. We partner with governments, corporates,
              NGOs, and development organizations to scale what works.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link href="/partners" className="btn btn-brand-primary btn-lg align-self-stretch align-self-sm-start">
                Partner With Us
              </Link>
              <Link href="/programs" className="btn btn-brand-outline btn-lg align-self-stretch align-self-sm-start">
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
