"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FitMap({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length)
      map.fitBounds(points, { padding: [36, 36], maxZoom: 15 });
  }, [map, points]);
  return null;
}

export default function DeliveryMap({ courier, destination }) {
  const courierPosition = [courier.latitude, courier.longitude];
  const destinationPosition = [destination.latitude, destination.longitude];
  const points = [courierPosition, destinationPosition];

  return (
    <div className="map-shell">
      <MapContainer
        center={courierPosition}
        zoom={14}
        style={{ height: "100%", minHeight: "330px", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <CircleMarker
          center={courierPosition}
          radius={10}
          pathOptions={{
            color: "#ffffff",
            fillColor: "#7547e8",
            fillOpacity: 1,
            weight: 3,
          }}
        >
          <Popup>
            Courier: {courier.name}
            <br />
            Almaz Kitchen, Bole, Addis Ababa, Ethiopia
          </Popup>
        </CircleMarker>
        <CircleMarker
          center={destinationPosition}
          radius={10}
          pathOptions={{
            color: "#ffffff",
            fillColor: "#159b72",
            fillOpacity: 1,
            weight: 3,
          }}
        >
          <Popup>
            Delivery destination
            <br />
            {destination.address}
          </Popup>
        </CircleMarker>
        <FitMap points={points} />
      </MapContainer>
      <div className="map-legend">
        <span>
          <i className="legend-dot courier-dot" /> Courier
        </span>
        <span>
          <i className="legend-dot destination-dot" /> Destination
        </span>
      </div>
    </div>
  );
}
