import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import { ThreeCircles } from "react-loader-spinner";

const DirectionsMap = ({ destination }) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation([latitude, longitude]); // Set state here
            resolve([latitude, longitude]);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  useEffect(() => {
    getUserLocation().catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    if (!currentLocation) return; // Don't initialize map if location is not set

    // Create the map instance
    const map = L.map("map").setView(currentLocation, 13);

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add routing control
    L.Routing.control({
      waypoints: [
        L.latLng(currentLocation[0], currentLocation[1]),
        L.latLng(destination[0], destination[1]),
        
      ],
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [currentLocation, destination]);

  if (!currentLocation) {
    return (
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  }

  return (
    <div
      id="map"
      style={{
        height: "500px",
        width: "100%",
        color: "transparent",
        border: 0,
      }}
    ></div>
  );
};

export default DirectionsMap;