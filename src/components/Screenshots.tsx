'use client';

import React, { useState } from "react";

// Lightweight shadcn/ui-like card components using your existing CSS (.card, .card__body)
const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", ...props }) => (
  <div className={`card ${className}`} {...props} />
);
const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", ...props }) => (
  <div className={`card__body ${className}`} {...props} />
);

// Remove leading slash from filenames for correct public path resolution in Next.js
const screenshotFiles = [
  "about.webp",
  "updater_1.webp",
  "updater_2.webp",
  "updater_3.webp",
  "about_phone_1.webp",
  "about_phone_2.webp",
  "about_phone_3.webp",
  "0.webp",
  "1.webp",
  "2.webp",
  "3.webp",
  "4.webp",
  "5.webp",
  "6.webp",
  "7.webp",
  "8.webp",
  "9.webp",
  "10.webp",
  "11.webp",
  "12.webp",
  "13.webp",
  "14.webp",
  "15.webp",
  "16.webp",
  "17.webp",
  "18.webp",
  "19.webp",
  "20.webp",
  "21.webp",
  "22.webp",
  "23.webp",
  "24.webp",
  "25.webp",
  "26.webp",
  "27.webp",
  "28.webp",
  "29.webp",
  "30.webp",
  "31.webp",
  "32.webp",
  "33.webp",
  "34.webp",
  "35.webp",
  "36.webp",
  "37.webp",
  "38.webp",
  "39.webp",
  "40.webp",
  "41.webp"
];

const Screenshots: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((prev) => (prev === 0 ? screenshotFiles.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === screenshotFiles.length - 1 ? 0 : prev + 1));

  return (
    <section className="screenshots" id="screenshots">
      <div className="container">
        <center><h2 className="section-title">Screenshots</h2></center>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button
            aria-label="Previous Screenshot"
            onClick={prev}
            className="btn btn--outline btn--sm"
            style={{ marginRight: "1rem" }}
          >
            ←
          </button>

          <Card className="screenshot-card" style={{ maxWidth: 820, margin: "0.5rem" }}>
            <CardContent style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={`/ss/${screenshotFiles[current]}`}
                alt={`Screenshot ${current + 1}`}
                loading="lazy"
                style={{
                  maxWidth: "100%",
                  maxHeight: "420px",
                  borderRadius: "0.5rem"
                }}
              />
            </CardContent>
          </Card>

          <button
            aria-label="Next Screenshot"
            onClick={next}
            className="btn btn--outline btn--sm"
            style={{ marginLeft: "1rem" }}
          >
            →
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: "0.5rem", color: "#888" }}>
          {current + 1} / {screenshotFiles.length}
        </div>
      </div>
    </section>
  );
};

export default Screenshots;
