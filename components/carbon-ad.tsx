"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  var _carbonads: {
    refresh: () => void;
  };
}

const CarbonAds = () => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.querySelector("#carbonads");
    if (prev && prev.parentElement) {
      prev.parentElement.removeChild(prev);
    }

    const script = document.createElement("script");
    script.src =
      "//cdn.carbonads.com/carbon.js?serve=CWBDP23M&placement=wwwloftlyycom&format=cover";
    script.id = "_carbonads_js";
    script.async = true;

    const container = containerRef.current;
    if (container) {
      container.appendChild(script);
    }

    return () => {};
  }, [pathname]);

  return (
    <>
      <style>{`
        .carbon-container #carbonads,
        .carbon-container #carbon-responsive,
        .carbon-container #carbon-responsive .carbon-responsive-wrap {
          max-width: 100%;
          min-width: 0;
        }
        .carbon-container #carbon-responsive {
          font-size: 13px;
        }
        .carbon-container #carbon-responsive .carbon-img {
          flex: 0 0 100%;
        }
        .carbon-container #carbon-responsive .carbon-img img {
          width: 100%;
          height: auto;
          max-width: 100%;
        }
      `}</style>
      <div
        className="carbon-container relative w-full"
        id="carbon-container"
        ref={containerRef}
      />
    </>
  );
};

export default CarbonAds;