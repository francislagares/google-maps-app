import React, { useEffect, useRef, useState } from 'react';
import { IMap } from '../../interfaces/IMap';
import { GoogleLatLng, GoogleMap } from '../../types/GoogleMaps';

import './Map.css';

const Map: React.FC<IMap> = ({
  mapType,
  mapTypeControl = false,
}): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();

  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
    }
  };

  useEffect(() => {
    startMap();
  });

  const defaultMapStart = (): void => {
    const defaultAddress = new google.maps.LatLng(41.390205, 2.154007);
    initMap(13, defaultAddress);
  };

  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          zoom: zoomLevel,
          center: address,
          mapTypeControl: mapTypeControl,
          streetViewControl: false,
          rotateControl: false,
          scaleControl: true,
          fullscreenControl: false,
          panControl: false,
          zoomControl: true,
          gestureHandling: 'cooperative',
          mapTypeId: mapType,
          draggableCursor: 'pointer',
        }),
      );
    }
  };

  return (
    <div className="map-container">
      <div ref={ref} className="map-container__map"></div>
    </div>
  );
};

export default Map;
