import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const Map = ({ stateCoverageData }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const [states, setStates] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [carriers, setCarriers] = useState([]);
  const [selectedCarrier, setSelectedCarrier] = useState();

  const getColorForCoverage = () => {
    if (selectedCarrier === "UPS") return "#FFB500";
    if (selectedCarrier === "FedEx") return "#43338E";
    if (selectedCarrier === "USPS") return "#333366";
    if (selectedCarrier === "Orchestro") return "#2294FF";
    return "#2294FF";
  };

  const getOpacityForCoverage = (coverage) => {
    if (coverage >= 0.8) return 1;
    if (coverage >= 0.6) return 0.8;
    if (coverage >= 0.4) return 0.6;
    if (coverage >= 0.2) return 0.4;
    return 0.2;
  };
  const updateStateColors = (map) => {
    if (!selectedCarrier) return;

    const coverage = stateCoverageData[selectedCarrier];
    const colorMapping = states.reduce((acc, state) => {
      const coverageValue = coverage[state];
      acc[state] = coverageValue
        ? getColorForCoverage()
        : "#ffffff";
      return acc;
    }, {});
    const opacityMapping = states.reduce((acc, state) => {
      const coverageValue = coverage[state];
      acc[state] = coverageValue ? getOpacityForCoverage(coverageValue) : "1";
      return acc;
    }, {});
    map.setPaintProperty("us-states-fill", "fill-color", [
      "match",
      ["get", "name"],
      ...Object.entries(colorMapping).flat(),
      "#ffffff",
    ]);
    map.setPaintProperty("us-states-fill", "fill-opacity", [
      "match",
      ["get", "name"],
      ...Object.entries(opacityMapping).flat(),
      1,
    ]);
  };

  useEffect(() => {
    const carriers = Object.keys(stateCoverageData);
    const states = new Set();

    carriers.forEach((carrier) => {
      Object.keys(stateCoverageData[carrier]).forEach((state) =>
        states.add(state)
      );
    });
    setStates(Array.from(states).sort());
    setCarriers(carriers);
    setSelectedCarrier(carriers[0]);
  }, [stateCoverageData]);
  const addUSAStateBorderLayers = (map) => {
    map.addLayer({
      id: "us-states-borders",
      type: "line",
      source: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json",
      },
      paint: {
        "line-color": "#616161",
        "line-width": 1,
      },
    });

    map.addLayer({
      id: "landcover",
      type: "fill",
      source: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson",
      },
      paint: {
        "fill-color": "#191A23",
      },
    });
  };

  const removeLayers = (map) => {
    const layersToRemove = [
      "country-label",
      "state-label",
      "settlement-label",
      "water-label",
      "poi-label",
      "road-label",
      "transit-label",
    ];

    layersToRemove.forEach((layer) => {
      if (map.getLayer(layer)) {
        map.removeLayer(layer);
      }
    });
  };
  useEffect(() => {
    if (selectedCarrier && !mapLoaded) {
      const defaultBounds = [
        [-125.0, 24.396308],
        [-66.93457, 49.384358],
      ];

      const mapBounds = defaultBounds;

      const center = [
        (mapBounds[0][0] + mapBounds[1][0]) / 2,
        (mapBounds[0][1] + mapBounds[1][1]) / 2,
      ];
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/dark-v10",
        center: center,
        zoom: 0,
        maxBounds: mapBounds,
        attributionControl: false,
      });

      mapRef.current.scrollZoom.disable();
      mapRef.current.on("load", () => {
        mapRef.current.setPaintProperty(
          "background",
          "background-color",
          "#191A23"
        );
        mapRef.current.setPaintProperty("water", "fill-color", "#191A23");

        mapRef.current.addLayer({
          id: "all-land",
          type: "fill",
          source: {
            type: "geojson",
            data: "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson",
          },
          paint: {
            "fill-color": "#191A23",
          },
          filter: ["!=", "ADMIN", "United States of America"],
        });

        mapRef.current.addLayer({
          id: "us-states-fill",
          type: "fill",
          source: {
            type: "geojson",
            data: "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json",
          },
          paint: {
            "fill-color": [
              "match",
              ["get", "name"],
              states,
              "#282A37",
              "#282A37",
            ],
          },
        });

        addUSAStateBorderLayers(mapRef.current);

        removeLayers(mapRef.current);
        updateStateColors(mapRef.current);
        setMapLoaded(true);
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    }
  }, [selectedCarrier]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapRef.current && mapLoaded) {
      updateStateColors(mapRef.current);
    }
  }, [selectedCarrier]);

  const coverageData = [
    "0 - 20% coverage",
    "20 - 40% coverage",
    "40 - 60% coverage",
    "60 - 80% coverage",
    "80 - 100% coverage",
  ];

  return (
    <div className="w-full my-8  flex flex-col h-full gap-8 shadow-[-2px_-6px_10px_0px_rgba(0,0,0,0.25),12px_12px_20px_0px_rgba(0,0,0,0.6)] mt-0 pt-8 border border-[#85869833] rounded-2xl">
      <div className="flex items-center justify-center font-semibold text-lg">
        Carrier Coverage Map
      </div>
      <div className="flex items-center justify-center flex-1 overflow-auto min-h-[60px] mx-8">
        <div className="flex items-center justify-center gap-2">
          {carriers.map((cur) => {
            return (
              <div
                key={cur}
                onClick={() => {
                  setSelectedCarrier(cur);
                }}
                className={`cursor-pointer text-base font-medium whitespace-nowrap px-6 py-2 border-[2px] rounded-lg ${selectedCarrier === cur ? "bg-[#2294FF1A] border-[#2294FF99]" : "bg-transparent border-[#85869833]"}`}
              >
                {cur}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex justify-center flex-1 gap-8">
        <div
          key="shipper-analysis-map"
          className="map-container"
          ref={mapContainerRef}
          style={{ height: "700px", width: "80%" }}
        />
        <div className="flex flex-col gap-4 self-center">
          {coverageData.map((item, index) => (
            <div key={index} className="flex items-center w-[200px] ">
              <div
                className="w-2 h-2 rounded-full"
                style={{ opacity: 1 / (coverageData?.length - index + 1),
                  backgroundColor: getColorForCoverage(item)
                 }}
              ></div>
              <p className="ml-2 text-[#87888C] text-base font-normal">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
