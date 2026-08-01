import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
  useMap,
} from "react-leaflet";

import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";

import Navbar from "../components/Navbar";
import "../App.css";

import campusLocations from "../data/campusLocations";
import campusGraph from "../data/campusGraph";
import dijkstra from "../data/dijkstra"; 
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapController({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, 18, {
        duration: 1,
      });
    }
  }, [center, map]);

  return null;
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function Map() {
  const location = useLocation();

  const detectedText =
    location.state?.detectedText?.toUpperCase() || "";

  const cleanText = detectedText
    .replace(/\s+/g, "")
    .replace(/[^A-Z0-9]/g, "");

  const matchedLocation = useMemo(() => {
    return campusLocations.find((place) => {
      const cleanCode = place.code
        .toUpperCase()
        .replace(/\s+/g, "")
        .replace(/[^A-Z0-9]/g, "");

      const aliasMatch =
        place.aliases?.some((alias) => {
          const cleanAlias = alias
            .toUpperCase()
            .replace(/\s+/g, "")
            .replace(/[^A-Z0-9]/g, "");

          return cleanText.includes(cleanAlias);
        }) || false;

      return cleanText.includes(cleanCode) || aliasMatch;
    });
  }, [cleanText]);

  const [startCode, setStartCode] = useState("GATE 1");
  const [endCode, setEndCode] = useState(
    matchedLocation?.code || ""
  );

  const [shortestPath, setShortestPath] = useState([]);

  const [liveMode, setLiveMode] = useState(false);
  const [liveLocation, setLiveLocation] = useState(null);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    if (matchedLocation) {
      setEndCode(matchedLocation.code);
    }
  }, [matchedLocation]);

  useEffect(() => {
    if (!liveMode) return;

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLiveLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });

        setLocationError("");
      },
      () => {
        setLocationError(
          "Location permission denied or GPS unavailable."
        );
      },
      {
        enableHighAccuracy: true,
        maximumAge: 2000,
        timeout: 10000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [liveMode]);

  const nearestLocation = useMemo(() => {
    if (!liveLocation) return null;

    let nearest = null;
    let minimumDistance = Infinity;

    campusLocations.forEach((place) => {
      if (!campusGraph[place.code]) return;

      const distance = calculateDistance(
        liveLocation.lat,
        liveLocation.lng,
        place.lat,
        place.lng
      );

      if (distance < minimumDistance) {
        minimumDistance = distance;

        nearest = {
          ...place,
          distance,
        };
      }
    });

    return nearest;
  }, [liveLocation]);

  useEffect(() => {
    if (!endCode) {
      setShortestPath([]);
      return;
    }

    const actualStart =
      liveMode && nearestLocation
        ? nearestLocation.code
        : startCode;

    if (
      !campusGraph[actualStart] ||
      !campusGraph[endCode]
    ) {
      return;
    }

    const path = dijkstra(
      campusGraph,
      actualStart,
      endCode
    );

    setShortestPath(path);
  }, [
    startCode,
    endCode,
    liveMode,
    nearestLocation,
  ]);

  const findRoute = () => {
    if (!endCode) {
      alert("Please select a destination.");
      return;
    }

    const actualStart =
      liveMode && nearestLocation
        ? nearestLocation.code
        : startCode;

    if (!campusGraph[actualStart]) {
      alert("Starting location is not connected to the campus graph.");
      return;
    }

    const path = dijkstra(
      campusGraph,
      actualStart,
      endCode
    );

    setShortestPath(path);
  };

  let routeCoordinates = shortestPath
    .map((code) =>
      campusLocations.find(
        (place) => place.code === code
      )
    )
    .filter(Boolean)
    .map((place) => [place.lat, place.lng]);

  if (
    liveMode &&
    liveLocation &&
    routeCoordinates.length > 0
  ) {
    routeCoordinates = [
      [liveLocation.lat, liveLocation.lng],
      ...routeCoordinates,
    ];
  }

  const selectedDestination = campusLocations.find(
    (place) => place.code === endCode
  );

  const gate1 = campusLocations.find(
    (place) => place.code === "GATE 1"
  );

  const mapCenter =
    liveMode && liveLocation
      ? [liveLocation.lat, liveLocation.lng]
      : selectedDestination
      ? [
          selectedDestination.lat,
          selectedDestination.lng,
        ]
      : [gate1.lat, gate1.lng];

  return (
    <>
      <Navbar />

      <main className="map-page">
        <div className="map-layout">
          <aside className="map-sidebar">
            <div className="map-side-header">
              <span>SMART ROUTING</span>
              <h2>Campus Navigator</h2>

              <p>
                Use manual routing or your live GPS location to
                navigate across campus.
              </p>
            </div>

            {matchedLocation && (
              <div className="ai-detected-card">
                <span>AI DETECTED</span>
                <strong>{matchedLocation.name}</strong>

                <small>
                  Destination selected automatically from image
                  recognition.
                </small>
              </div>
            )}

            <button
              className="live-location-btn"
              onClick={() =>
                setLiveMode((previous) => !previous)
              }
            >
              {liveMode
                ? "● Live Location ON"
                : "📍 Use My Live Location"}
            </button>

            {liveMode && liveLocation && (
              <div className="live-location-info">
                <strong>Current GPS Location</strong>

                {nearestLocation && (
                  <span>
                    Nearest campus point:{" "}
                    {nearestLocation.name}
                  </span>
                )}

                <span>
                  Accuracy: ±
                  {Math.round(liveLocation.accuracy)} m
                </span>
              </div>
            )}

            {locationError && (
              <div className="location-error">
                {locationError}
              </div>
            )}

            <div className="route-form">
              <label>Starting Point</label>

              {liveMode ? (
                <div className="live-start-box">
                  📍 Your Live Location
                </div>
              ) : (
                <select
                  value={startCode}
                  onChange={(e) =>
                    setStartCode(e.target.value)
                  }
                >
                  {campusLocations.map((place) => (
                    <option
                      key={place.code}
                      value={place.code}
                    >
                      {place.name}
                    </option>
                  ))}
                </select>
              )}

              <div className="route-arrow">↓</div>

              <label>Destination</label>

              <select
                value={endCode}
                onChange={(e) =>
                  setEndCode(e.target.value)
                }
              >
                <option value="">
                  Select destination
                </option>

                {campusLocations.map((place) => (
                  <option
                    key={place.code}
                    value={place.code}
                  >
                    {place.name}
                  </option>
                ))}
              </select>

              <button
                className="find-route-button"
                onClick={findRoute}
              >
                🧭 Start Navigation
              </button>
            </div>

            {shortestPath.length > 0 && (
              <div className="route-result">
                <div className="route-result-title">
                  <span>ROUTE FOUND</span>

                  <strong>
                    {shortestPath.length - 1} Stops
                  </strong>
                </div>

                <div className="route-steps">
                  {liveMode && (
                    <div className="route-step">
                      <div className="route-step-marker">
                        GPS
                      </div>

                      <div>
                        <strong>
                          Your Current Location
                        </strong>

                        <span>Live start</span>
                      </div>
                    </div>
                  )}

                  {shortestPath.map((code, index) => {
                    const place =
                      campusLocations.find(
                        (item) =>
                          item.code === code
                      );

                    return (
                      <div
                        className="route-step"
                        key={code}
                      >
                        <div className="route-step-marker">
                          {index + 1}
                        </div>

                        <div>
                          <strong>
                            {place?.name || code}
                          </strong>

                          {!liveMode &&
                            index === 0 && (
                              <span>Start</span>
                            )}

                          {index ===
                            shortestPath.length - 1 && (
                            <span>Destination</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="map-system-status">
              <div>
                <span className="online-dot"></span>
                Navigation Engine Online
              </div>

              <small>
                GPS + Dijkstra Shortest Path
              </small>
            </div>
          </aside>

          <section className="map-container-wrapper">
            <div className="map-floating-title">
              <div>
                <span>GALGOTIAS UNIVERSITY</span>
                <strong>
                  {liveMode
                    ? "Live Campus Navigation"
                    : "Campus Map"}
                </strong>
              </div>

              <div className="map-location-count">
                {campusLocations.length} Locations
              </div>
            </div>

            <MapContainer
              center={mapCenter}
              zoom={18}
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <MapController center={mapCenter} />

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {campusLocations.map((place) => (
                <Marker
                  key={place.code}
                  position={[
                    place.lat,
                    place.lng,
                  ]}
                >
                  <Popup>
                    <strong>{place.name}</strong>
                    <br />
                    {place.code}
                  </Popup>
                </Marker>
              ))}

              {liveLocation && (
                <>
                  <CircleMarker
                    center={[
                      liveLocation.lat,
                      liveLocation.lng,
                    ]}
                    radius={9}
                    pathOptions={{
                      color: "white",
                      weight: 3,
                      fillColor: "#2563eb",
                      fillOpacity: 1,
                    }}
                  >
                    <Popup>
                      📍 Your Current Location
                    </Popup>
                  </CircleMarker>

                  <CircleMarker
                    center={[
                      liveLocation.lat,
                      liveLocation.lng,
                    ]}
                    radius={22}
                    pathOptions={{
                      color: "#2563eb",
                      weight: 1,
                      fillColor: "#2563eb",
                      fillOpacity: 0.12,
                    }}
                  />
                </>
              )}

              {routeCoordinates.length > 1 && (
                <Polyline
                  positions={routeCoordinates}
                  pathOptions={{
                    color: "#2563eb",
                    weight: 7,
                    opacity: 0.9,
                  }}
                />
              )}
            </MapContainer>

            {shortestPath.length > 0 && (
              <div className="map-route-summary">
                <span>
                  {liveMode
                    ? "LIVE ROUTE"
                    : "ACTIVE ROUTE"}
                </span>

                <strong>
                  {liveMode
                    ? "Current Location → "
                    : ""}

                  {shortestPath.join(" → ")}
                </strong>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default Map;