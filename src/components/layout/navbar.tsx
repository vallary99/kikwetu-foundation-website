"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNav } from "@/data/navigation";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the mobile menu whenever the route changes. Derived during render
  // (rather than in a useEffect) to avoid an extra cascading render pass.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (isOpen) setIsOpen(false);
  }

  return (
    <nav
      className="kf-navbar navbar navbar-expand-lg sticky-top py-2"
      aria-label="Primary navigation"
    >
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2 py-1">
          <Image
            src="/logo/kikwetu-foundation-logo.png"
            alt="Kikwetu Foundation logo"
            width={1024}
            height={877}
            priority
            className="logo"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="kf-primary-nav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="kf-primary-nav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1 mt-3 mt-lg-0">
            {primaryNav.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li className="nav-item" key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link kf-nav-link ${isActive ? "active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <Link href="/partners" className="btn btn-brand-primary btn-sm w-100">
                Partner With Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
