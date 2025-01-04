import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const GeoJSONMap = () => {
  const geoJsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Point 1" },
        geometry: {
          type: "Point",
          coordinates: [90.4125, 23.8103], // Example coordinates (Dhaka, Bangladesh)
        },
      },
      {
        type: "Feature",
        properties: { name: "Point 2" },
        geometry: {
          type: "Point",
          coordinates: [90.402, 23.8145],
        },
      },
    ],
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name);
    }
  };

  return (
    <div className="h-screen">
      <MapContainer center={[23.8103, 90.4125]} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON data={geoJsonData} onEachFeature={onEachFeature} />
      </MapContainer>
    </div>
  );
};

export default GeoJSONMap;
