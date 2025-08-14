import React from "react";

export default function TeamPage() {
  return (
    <>
      <style>{`
        .team, .maintainers {
          padding: 60px 0;
          text-align: center;
        }
        .team__title, .maintainers__title {
          font-size: 2.5rem;
          margin-bottom: 40px;
          color: var(--color-teal-500);
        }
        .team__grid, .maintainers__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .team-card, .maintainer-card {
          background: #F1F3F4;
          border-radius: 24px;
          border: 1px solid rgba(31,27,24,0.12);
          box-shadow: 0 2px 4px rgba(31,27,24,0.12);
          padding: 24px;
          transition: all 200ms cubic-bezier(0.4,0,0.2,1);
        }
        .team-card:hover, .maintainer-card:hover {
          background: #E0E0E0;
          box-shadow: 0 4px 8px rgba(31,27,24,0.16);
          transform: translateY(-4px);
        }
        @media (prefers-color-scheme: dark) {
          .team-card, .maintainer-card {
            background: var(--color-charcoal-800, #262829);
            border-color: rgba(255,255,255,0.12);
          }
          .team-card:hover, .maintainer-card:hover {
            background: var(--color-charcoal-700, #1f2123);
          }
          .team-card__name, .maintainer-card__name {
            color: var(--color-gray-200, #f5f5f5) !important;
          }
          .team-card__bio, .maintainer-card__bio {
            color: rgba(245,245,245,0.7) !important;
          }
        }
        .team-card:hover .team-card__name,
        .team-card:hover .team-card__role,
        .team-card:hover .team-card__bio,
        .maintainer-card:hover .maintainer-card__name,
        .maintainer-card:hover .maintainer-card__role,
        .maintainer-card:hover .maintainer-card__bio {
          color: inherit;
        }
        .team-card__photo, .maintainer-card__photo {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 16px;
          box-shadow: 0 1px 3px rgba(31,27,24,0.08);
        }
        .team-card__name, .maintainer-card__name {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 4px;
          color: #1F1B18;
        }
        .team-card__role, .maintainer-card__role {
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 12px;
          color: var(--color-teal-500);
        }
        .team-card__bio, .maintainer-card__bio {
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 16px;
          color: rgba(31,27,24,0.7);
        }
        .team-card__links, .maintainer-card__links {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .maintainer-card__devices {
          margin-bottom: 16px;
        }
        .device-badge {
          display: inline-block;
          background: var(--color-teal-500);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          margin: 2px;
        }
        .device-count {
          font-size: 0.875rem;
          color: var(--color-teal-500);
          font-weight: 500;
        }
        .social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: white;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .social-link.github {
          background: #333;
        }
        .social-link.github:hover {
          background: #24292e;
          transform: scale(1.1);
        }
        .social-link.telegram {
          background: #0088cc;
        }
        .social-link.telegram:hover {
          background: #006ba6;
          transform: scale(1.1);
        }
        @media (prefers-color-scheme: dark) {
          .social-link.github {
            background: #f5f5f5;
            color: #333;
          }
          .social-link.github:hover {
            background: #e0e0e0;
            color: #24292e;
          }
          .social-link.github svg {
            fill: #333;
          }
        }
        .social-link svg {
          width: 20px;
          height: 20px;
          fill: currentColor;
        }
        .team-card.loading, .maintainer-card.loading {
          opacity: 0.7;
          position: relative;
        }
        .team-card.loading::after, .maintainer-card.loading::after {
          content: "Loading...";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.875rem;
          color: var(--color-teal-500);
        }
        @media (max-width: 480px) {
          .team-card, .maintainer-card {
            padding: 16px;
          }
          .team-card__photo, .maintainer-card__photo {
            width: 80px;
            height: 80px;
          }
        }
      `}</style>
      <header className="header">
        <nav className="nav container">
          <div className="nav__brand">
            <h2 className="nav__logo">
              <a href="/">
                <img src="/assets/yaaplogo.svg" alt="YAAP" className="logo-yaap" width={220} />
              </a>
            </h2>
          </div>
          <div className="nav__menu" id="nav-menu">
            <a href="/#home" className="nav__link">Home</a>
            <a href="/team.html" className="nav__link">Our team</a>
            <a href="/#screenshots" className="nav__link">Screenshots</a>
            <a href="/#downloads" className="nav__link">Download</a>
            <a href="/#community" className="nav__link">Community</a>
            <a href="/#contribute" className="nav__link">Contribute</a>
          </div>
          <button className="nav__toggle" id="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      <section className="team">
        <div className="container">
          <h2 className="team__title" style={{ paddingTop: 30 }}>Core Developers</h2>
          <div className="team__grid" id="team-grid">
            {/* You can fetch and render team members here using React/Next.js */}
          </div>
        </div>
      </section>

      <section className="maintainers">
        <div className="container">
          <h2 className="maintainers__title">Device Maintainers</h2>
          <div className="maintainers__grid" id="maintainers-grid">
            {/* You can fetch and render maintainers here using React/Next.js */}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer__bottom">
            <p>&copy; 2025 YAAP Team. All rights reserved.</p>
            <p>YAAP is not affiliated with Google or Android.</p>
            <a href="https://github.com/yaap/yaap_site">Site source code</a>
          </div>
        </div>
      </footer>
    </>
  );
}
