"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

type DeviceInfo = {
  name?: string;
  maintainer?: string;
  image?: string;
  group?: string;
  ["ota-branch"]?: string;
  ["ota-branch-vanilla"]?: string;
};

type OtaResponse =
  | { filename?: string; datetime?: number | string }
  | { response?: { filename?: string; datetime?: number | string }[] }
  | Record<string, unknown>;

function pickField<T extends "filename" | "datetime">(
  src: OtaResponse | null,
  field: T
): string | number | undefined {
  if (!src) return undefined;
  // direct field
  const direct = (src as any)?.[field];
  if (direct != null) return direct as any;
  // nested response[0]
  const nested = (src as any)?.response?.[0]?.[field];
  return nested as any;
}

function normTs(v: number | string | undefined): number | undefined {
  if (v == null) return undefined;
  const n = typeof v === "string" ? parseInt(v, 10) : v;
  if (Number.isNaN(n as number)) return undefined;
  // seconds vs ms
  return (n as number) < 1e12 ? (n as number) * 1000 : (n as number);
}

export default function DownloadPage() {
  const search = useSearchParams();
  const pathname = usePathname();

  // Derive codename from ?codename= or /devices/<codename>
  const codename = useMemo(() => {
    const fromQuery = search.get("codename");
    if (fromQuery) return fromQuery.trim();
    // Try last path segment if present
    const segments = (pathname || "").split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    // If we are at /devices, last will be 'devices'. Only use if it isn't.
    const maybeCode = last && last.toLowerCase() !== "devices" ? last : "";
    return maybeCode;
  }, [search, pathname]);

  // Basic sanitization to avoid malformed requests
  const safeCodename = useMemo(
    () => (codename || "").replace(/[^a-zA-Z0-9._-]/g, ""),
    [codename]
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [device, setDevice] = useState<DeviceInfo | null>(null);
  const [latestGapps, setLatestGapps] = useState<string | null>(null);
  const [latestVanilla, setLatestVanilla] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("Unknown");
  const [changelog, setChangelog] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!safeCodename) {
        setError("Missing device codename.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        // Fetch device info
        const deviceRes = await fetch(
          `https://raw.githubusercontent.com/yaap/device-info/master/${safeCodename}/${safeCodename}.json`
        );
        if (!deviceRes.ok) throw new Error("Failed to fetch device info");
        const deviceInfo = (await deviceRes.json()) as DeviceInfo;

        const otaBranch = deviceInfo["ota-branch"];
        const vanillaOtaBranch = deviceInfo["ota-branch-vanilla"];

        // Fetch OTA infos (gapps + vanilla)
        const [otaInfoRes, vanillaOtaRes] = await Promise.all([
          otaBranch
            ? fetch(
                `https://raw.githubusercontent.com/yaap/ota-info/${otaBranch}/${safeCodename}/${safeCodename}.json`
              )
            : Promise.resolve(null as any),
          vanillaOtaBranch
            ? fetch(
                `https://raw.githubusercontent.com/yaap/ota-info/${vanillaOtaBranch}/${safeCodename}/${safeCodename}.json`
              )
            : Promise.resolve(null as any),
        ]);

        const otaInfo: OtaResponse | null =
          otaInfoRes && otaInfoRes.ok ? await otaInfoRes.json() : null;
        const vanillaInfo: OtaResponse | null =
          vanillaOtaRes && vanillaOtaRes.ok ? await vanillaOtaRes.json() : null;

        const ts1 = normTs(pickField(otaInfo, "datetime"));
        const ts2 = normTs(pickField(vanillaInfo, "datetime"));
        const latestTs = Math.max(ts1 || 0, ts2 || 0);
        const lastUpdatedStr =
          latestTs && latestTs > 0
            ? new Date(latestTs).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Unknown";

        const gappsName = pickField(otaInfo, "filename");
        const vanillaName = pickField(vanillaInfo, "filename");

        // Changelog (optional)
        let changeText = "";
        if (otaBranch) {
          const clRes = await fetch(
            `https://raw.githubusercontent.com/yaap/ota-info/${otaBranch}/${safeCodename}/Changelog.txt`
          );
          if (clRes.ok) changeText = await clRes.text();
        }

        // Instructions (raw markdown text)
        let mdText = "";
        const mdRes = await fetch(
          `https://raw.githubusercontent.com/yaap/device-info/master/${safeCodename}/${safeCodename}.md`
        );
        if (mdRes.ok) mdText = await mdRes.text();

        if (cancelled) return;

        setDevice(deviceInfo);
        setLatestGapps((gappsName as string) || null);
        setLatestVanilla((vanillaName as string) || null);
        setLastUpdated(lastUpdatedStr);
        setChangelog(changeText);
        setInstructions(mdText);
      } catch (e: any) {
        if (cancelled) return;
        setError("Failed to load device info.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [safeCodename]);

  return (
    <>
      <Header />
      <main className="device-page container" style={{ paddingTop: 80 }}>
        {!safeCodename && <p>Missing device codename.</p>}
        {loading && <p>Loading device info...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && device && (
          <>
            <div className="device-card device-card--spaced" style={{ alignItems: "center", gap: "2rem" }}>
              <img
                src={device.image || "/assets/placeholder.jpg"}
                alt={device.name || codename}
                style={{ width: 260, borderRadius: 8, objectFit: "contain", background: "var(--color-surface)", padding: "0.5rem" }}
              />
              <div className="device-info" style={{ flex: 1 }}>
                <h2 style={{ margin: 0 }}>{device.name} ({codename})</h2>
                <p className="device-meta" style={{ color: "#666", margin: "0.3rem 0 1rem", fontSize: "0.95rem" }}>
                  Maintainer: {device.maintainer || "Unknown"} | Last Updated: {lastUpdated}
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <a className="download-btn" href={`https://mirror.codebucket.de/yaap/${codename}/`}>
                    Download
                  </a>
                  {device.group && (
                    <a className="download-btn" href={device.group}>
                      Support Group
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="changelog-card">
              <h4>Latest Changelog</h4>
              <pre style={{ whiteSpace: "pre-wrap" }}>{changelog || "No changelog available."}</pre>
              <div style={{ marginTop: "0.5rem" }}>
                Latest GApps build: <code>{latestGapps || "N/A"}</code>
              </div>
              <div>
                Latest Vanilla build: <code>{latestVanilla || "N/A"}</code>
              </div>
            </div>

            <div className="changelog-card">
              <h2>Flashing Instructions</h2>
              {/* Rendering raw Markdown as text to avoid extra deps. */}
              <pre id="instructions-list" style={{ whiteSpace: "pre-wrap" }}>
                {instructions || "No instructions available."}
              </pre>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
