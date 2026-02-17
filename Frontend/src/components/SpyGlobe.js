import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const SpyGlobe = ({ onCountryClick }) => {
  const globeEl = useRef();

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.4;
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.1 });
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        onGlobeClick={({ lat, lng }) => {
          const coord = `COORD: ${lat.toFixed(2)}, ${lng.toFixed(2)}`;
          onCountryClick(coord);
        }}
        atmosphereColor="#00FFCC"
        atmosphereDayLength={0.15}
      />
    </div>
  );
};

export default SpyGlobe;