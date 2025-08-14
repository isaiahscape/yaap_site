'use client';
import React, { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Our team" },
  { href: "/#screenshots", label: "Screenshots" },
  { href: "/devices", label: "Download" },
  { href: "/#community", label: "Community" },
  { href: "/#contribute", label: "Contribute" },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__logo">
          <a href="/#home" className="nav__brand">
            <img src="/yaaplogo.svg" alt="YAAP Logo" style={{ height: "2rem" }} />
          </a>
        </div>
        <div className="nav__dropdown" style={{ position: "relative" }}>
          <button
            className="nav__toggle"
            id="nav-toggle"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-dropdown-list"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem"
            }}
          >
            <span style={{ width: 24, height: 3, background: "#ffffffff", borderRadius: 2, display: "block" }} />
            <span style={{ width: 24, height: 3, background: "#ffffffff", borderRadius: 2, display: "block" }} />
            <span style={{ width: 24, height: 3, background: "#ffffffff", borderRadius: 2, display: "block" }} />
          </button>
          <div
            id="nav-dropdown-list"
            className="nav__links"
            style={{
              display: open ? "flex" : "none",
              flexDirection: "column",
              position: "absolute",
              top: "calc(100% + 8px)", // aligns dropdown just below the button
              right: 0,
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.06)",
              zIndex: 1000,
              minWidth: "160px"
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav__link"
                style={{
                  padding: "0.75rem 1.25rem",
                  textDecoration: "none",
                  color: "#222",
                  borderBottom: "1px solid #f0f0f0",
                  fontWeight: 500
                }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;