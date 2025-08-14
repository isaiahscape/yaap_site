"use client";

import React, { useEffect, useState } from "react";

interface Device {
  codename: string;
  brand: string;
  name?: string;
}

const DeviceList: React.FC = () => {
  const [devicesByBrand, setDevicesByBrand] = useState<{ [brand: string]: Device[] }>({});
  const [sortedBrands, setSortedBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get folder list from GitHub repo
        const repoContents = await fetch("https://api.github.com/repos/yaap/device-info/contents").then(r => r.json());
        const deviceFolders = repoContents.filter((item: any) => item.type === "dir");

        // Fetch each device JSON
        const devicesData = await Promise.all(deviceFolders.map(async (folder: any) => {
          try {
            const infoUrl = `https://raw.githubusercontent.com/yaap/device-info/master/${folder.name}/${folder.name}.json`;
            const info = await fetch(infoUrl).then(r => r.json());
            const brand = info.name ? info.name.split(" ")[0] : "Unknown";
            return { codename: folder.name, brand, ...info };
          } catch (err) {
            console.error("Failed to load device", folder.name, err);
            return null;
          }
        }));

        const devices = devicesData.filter(Boolean) as Device[];

        // Group by brand
        const brandMap: { [key: string]: Device[] } = {};
        devices.forEach(device => {
          if (!brandMap[device.brand]) {
            brandMap[device.brand] = [];
          }
          brandMap[device.brand].push(device);
        });

        // sort each brand by device name
        Object.keys(brandMap).forEach(b => {
          brandMap[b].sort((a, b) => {
            const nameA = a.name || "";
            const nameB = b.name || "";
            return nameA.localeCompare(nameB);
          });
        });

        // Sort brands alphabetically
        const sortedBrands = Object.keys(brandMap).sort();

        setDevicesByBrand(brandMap);
        setSortedBrands(sortedBrands);

      } catch (err) {
        console.error(err);
        setError("Failed to load devices.");
      } finally {
        setLoading(false);
      }
    }

    fetchDevices();
  }, []);

  if (loading) return <div>Loading devices...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="devices__grid">
      {sortedBrands.length === 0 && <p>No devices found.</p>}
      {sortedBrands.map(brand => (
        <div className="device-brand" data-brand={brand} key={brand}>
          <h3 className="device-brand__title">{brand}</h3>
          <div className="device-brand__models">
            {devicesByBrand[brand].map(d => (
              <div className="device-card" key={d.codename}>
                <h4 className="device-card__name">{d.name}</h4>
                <a href={`devices/${d.codename}`} className="btn btn--primary btn--sm">Download</a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeviceList;