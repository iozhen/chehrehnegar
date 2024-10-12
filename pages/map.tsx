import React, { useCallback, useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import ImageLayer from "ol/layer/Image";
import XYZ from "ol/source/XYZ";
import ImageWMS from "ol/source/ImageWMS";
import MousePosition from "ol/control/MousePosition";
import ScaleLine from "ol/control/ScaleLine";
import Overlay from "ol/Overlay";
import { Coordinate } from "ol/coordinate";
import Sidebar from "@/components/Sidebar";

import { fromLonLat } from "ol/proj";
import { LineString, Polygon } from "ol/geom";
import { Feature } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Stroke, Style, Fill } from "ol/style";
import { getDistance, getArea } from "ol/sphere";
import { Draw } from "ol/interaction";
import axios from "axios";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
} from "chart.js";
import DateSlider from "@/components/DateSlider";
import MapHeader from "@/components/MapHeader";
import Tools from "@/components/Tools";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Plans from "@/components/Plans";
import { useSelector } from "react-redux";

ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale);

const MapComponents: React.FC = () => {
  const wetland = useSelector((state: any) => state.sidebar.isWetlands);
  const dams = useSelector((state: any) => state.sidebar.isDams);
  const floodMap = useSelector((state: any) => state.sidebar.isFloods);
  const floodAlert = useSelector((state: any) => state.sidebar.isFloodAlert);
  const isLogin = useSelector((state: any) => state.login.isLogin);
  const selectedDate = useSelector((state) => state.date.selectedDate);

  const [isSubMenu, setIsSubMenu] = useState(0);
  // const [mapType, setMapType] = useState("Open Street Map");
  const [activeLayers, setActiveLayers] = useState<any[]>([]);
  const [activeOverlays, setActiveOverlays] = useState<any>([]);
  const mapType = useSelector((state) => state.sidebar.mapType);
  const [isRulerActive, setIsRulerActive] = useState(false);
  const [points, setPoints] = useState<Coordinate[]>([]);
  const mapElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [areaFlag, setAreaFlag] = useState(false);
  const [draw, setDraw] = useState<Draw | null>(null);
  const [vectorSource] = useState(new VectorSource());
  const [info, setInfo] = useState(false);
  const [chart, setChart] = useState(false);
  const [wetlandsResponse, setWetlandsResponse] = useState("");
  const [reservoirsResponse, setReservoirsResponse] = useState("");
  const [wetlandChart, setWetlandChart] = useState(null);
  const [reservoirsChart, setReservoirsChart] = useState(null);
  const [isPlans, setIsPlans] = useState(false);
  const [vectorLayer] = useState(
    new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)",
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          width: 2,
        }),
      }),
    })
  );

  const handleEscapeButton = (e: any) => {
    console.log("escape");
    if (e.key === "Escape") {
      setPoints([]);
      if (draw) {
        map?.removeInteraction(draw);
        setDraw(null);
      }
    }
  };

  useEffect(() => {
    console.log("draw1");
    if (draw === null && isRulerActive) {
      console.log("draw2");
      addInteraction("line");
    } else {
      console.log(draw);
      if (draw) {
        document.addEventListener("keydown", handleEscapeButton);
      }
    }
  }, [draw]);

  const popupContent = useRef();

  const wetlandsLayer = useRef();

  const damsLayer = useRef();

  const floodsLayer = useRef();

  const floodAlertsLayer = useRef();

  //token handeling
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      wetlandsLayer.current = new ImageLayer({
        title: "Wetlands",
        visible: false,
        source: new ImageWMS({
          url: "http://bina.civil.sharif.edu/geoserver/wms",
          params: { LAYERS: "Wetlands:Wetlands" },
          ratio: 1,
          serverType: "geoserver",
        }),
      });

      damsLayer.current = new ImageLayer({
        title: "Reservoirs",
        visible: false,
        source: new ImageWMS({
          url: "http://bina.civil.sharif.edu/geoserver/wms",
          params: { LAYERS: "allyears:y1987" },
          ratio: 1,
          serverType: "geoserver",
        }),
      });

      floodsLayer.current = new ImageLayer({
        title: "Flood Map",
        visible: false,
        source: new ImageWMS({
          url: "http://bina.civil.sharif.edu/geoserver/wms",
          params: { LAYERS: `floodmap:floodmap_${selectedDate}` },
          ratio: 1,
          serverType: "geoserver",
        }),
      });

      floodAlertsLayer.current = new ImageLayer({
        title: "Flood Alert",
        visible: false,
        source: new ImageWMS({
          url: "http://bina.civil.sharif.edu/geoserver/wms",
          params: { LAYERS: `floodalert:floodalert_${selectedDate}` },
          ratio: 1,
          serverType: "geoserver",
        }),
      });

      // Define map layers
      const osm = new TileLayer({
        title: "Open Street Map",
        visible: false,
        source: new XYZ({
          url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        }),
      });

      const googleRoadMap = new TileLayer({
        title: "Google Roads",
        visible: false,
        source: new XYZ({
          url: "http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
          attributions: "Powered by Google",
        }),
      });

      const googleTerrainRoads = new TileLayer({
        title: "Google Terrain",
        visible: false,
        source: new XYZ({
          url: "http://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
          attributions: "Powered by Google",
        }),
      });

      const googleSatellite = new TileLayer({
        title: "Google Satellite",
        visible: false,
        source: new XYZ({
          url: "http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}",
          attributions: "Powered by Google",
        }),
      });

      const googleSatelliteRoads = new TileLayer({
        title: "Labeled Google Satellite",
        visible: false,
        source: new XYZ({
          url: "http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
          attributions: "Powered by Google",
        }),
      });

      const waterColor = new TileLayer({
        title: "Water Color",
        visible: false,
        source: new XYZ({
          url: "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg",
        }),
      });

      // Create the map
      const newMap = new Map({
        target: mapElement.current || undefined,
        view: new View({
          projection: "EPSG:4326",
          center: [53, 33],
          zoom: 6,
        }),
        layers: [
          osm,
          googleRoadMap,
          googleTerrainRoads,
          googleSatellite,
          googleSatelliteRoads,
          waterColor,
          wetlandsLayer.current, // Add wetlandsLayer
          damsLayer.current, // Add damsLayer
          floodsLayer.current, // Add floods layer
          floodAlertsLayer.current,
          vectorLayer, // Add vectorLayer to map
        ],
      });

      setMap(newMap);

      // Cleanup on component unmount
      return () => newMap.setTarget(undefined);
    }
  }, []);

  useEffect(() => {
    if (floodsLayer.current) {
      floodsLayer.current.getSource().updateParams({
        LAYERS: `floodmap:floodmap_${selectedDate}`,
      });
    }

    if (floodAlertsLayer.current) {
      floodAlertsLayer.current.getSource().updateParams({
        LAYERS: `floodalert:floodalert_${selectedDate}`,
      });
    }
  }, [selectedDate]);

  useEffect(() => {
    if (map) {
      const updateMapLayer = () => {
        map.getLayers().forEach((layer) => {
          if (layer instanceof TileLayer || layer instanceof ImageLayer) {
            layer.setVisible(layer.get("title") === mapType);
          }
        });
      };
      updateMapLayer();
    }
  }, [map, mapType]);

  // Show mouse coordinates
  useEffect(() => {
    if (map && typeof window !== "undefined") {
      // Controls
      const mousePosition = new MousePosition({
        projection: "EPSG:4326",
        coordinateFormat: (coordinate: Coordinate) => {
          return `${coordinate[0].toFixed(6)}, ${coordinate[1].toFixed(6)}`;
        },
      });

      const scaleControl = new ScaleLine({
        bar: true,
      });

      map.addControl(mousePosition);
      map.addControl(scaleControl);
    }
  }, [map]);

  const addInteraction = (type: string) => {
    const newDraw = new Draw({
      source: vectorSource,
      type: type === "line" ? "LineString" : "Polygon",
    });

    newDraw.on("drawend", (event) => {
      const polygon = event.feature.getGeometry() as Polygon;
      const area = getArea(polygon);
      const output = `${Math.round(area * 100) / 100} m²`;

      const tooltipElement = document.createElement("div");
      tooltipElement.className = "ol-tooltip ol-tooltip-static";
      tooltipElement.innerHTML = output;

      const overlay = new Overlay({
        element: tooltipElement,
        offset: [0, -15],
        positioning: "bottom-center",
      });
      overlay.setPosition(polygon?.getInteriorPoint().getCoordinates());
      map.addOverlay(overlay);
    });

    setDraw(newDraw);
    map.addInteraction(newDraw);
  };

  useEffect(() => {
    if (isRulerActive) {
      if (map && typeof window !== "undefined") {
        map?.addEventListener("click", handleSetClick);
        addInteraction("line");
      }
    } else {
      if (draw) {
        map?.removeInteraction(draw);
        setDraw(null);
      }
      map?.removeEventListener("click", handleSetClick);
      setPoints([]);
      for (const item of activeLayers) {
        map?.removeLayer(item);
      }
      for (const item of activeOverlays) {
        map?.removeOverlay(item);
      }
    }
  }, [isRulerActive]);

  useEffect(() => {
    if (points.length >= 2) {
      const line = new LineString([
        points[points.length - 2],
        points[points.length - 1],
      ]);
      const distance = getDistance(
        fromLonLat(points[points.length - 2]),
        fromLonLat(points[points.length - 1])
      );
      const distanceFeature = new Feature({
        geometry: line,
      });

      distanceFeature.setStyle(
        new Style({
          stroke: new Stroke({
            color: "#ff3355",
            width: 2,
          }),
        })
      );

      const vectorSource = new VectorSource({
        features: [distanceFeature],
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      map?.addLayer(vectorLayer);
      setActiveLayers((prevLayers) => [...prevLayers, vectorLayer]);

      const [start, end] = [
        points[points.length - 2],
        points[points.length - 1],
      ];
      const midPoint = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];

      const distanceOverlay = new Overlay({
        element: document.createElement("div"),
        position: midPoint,
        positioning: "bottom-center",
      });

      distanceOverlay.getElement().innerHTML = `${distance.toFixed(2)} meters`;
      distanceOverlay.getElement().style.color = "black";
      distanceOverlay.getElement().style.backgroundColor = "white";
      distanceOverlay.getElement().style.padding = "5px";
      distanceOverlay.getElement().style.borderRadius = "5px";

      map?.addOverlay(distanceOverlay);
      setActiveOverlays((prevOverlays: any) => [
        ...prevOverlays,
        distanceOverlay,
      ]);
    }
  }, [points]);

  const handleSetClick = useCallback((evt: any) => {
    const clickedPoint = evt.coordinate;
    setPoints((prevPoints) => [...prevPoints, clickedPoint]);
  }, []);

  const handleRulerButtonClick = () => {
    setIsRulerActive(!isRulerActive);
  };

  const handleAreaButtonClick = () => {
    setAreaFlag(!areaFlag);

    if (areaFlag) {
      if (draw) {
        map?.removeInteraction(draw);
        setDraw(null);
      }
      vectorSource.clear();
      const elements = document.getElementsByClassName(
        "ol-tooltip ol-tooltip-static"
      );
      while (elements.length > 0) elements[0].remove();
    } else {
      addInteraction();
    }
  };

  const handleInfo = async (evt) => {
    if (info) {
      const coordinate = evt.coordinate;
      const viewResolution = map.getView().getResolution();

      const wetlandsSource = wetlandsLayer.current.getSource();
      const reservoirsSource = damsLayer.current.getSource();

      const wetlandsFeatureInfoUrl = wetlandsSource.getFeatureInfoUrl(
        coordinate,
        viewResolution,
        "EPSG:4326",
        { INFO_FORMAT: "text/html" }
      );

      const reservoirsFeatureInfoUrl = reservoirsSource.getFeatureInfoUrl(
        coordinate,
        viewResolution,
        "EPSG:4326",
        { INFO_FORMAT: "text/html" }
      );

      if (wetlandsFeatureInfoUrl) {
        axios.get(wetlandsFeatureInfoUrl).then((res) => {
          setWetlandsResponse(res.data);
          setReservoirsResponse("");
          // if (popupContent.current) {
          //    console.log("====================================");
          //    console.log(wetlandsResponse);
          //    console.log("====================================");
          //    popupContent.current.innerHTML = wetlandsResponse;
          // }
        });
      }

      if (reservoirsFeatureInfoUrl) {
        axios.get(reservoirsFeatureInfoUrl).then((res) => {
          setReservoirsResponse(res.data);
          setWetlandsResponse("");
          // if (popupContent.current) {
          //    popupContent.current.innerHTML += reservoirsResponse;
          // }
        });
      }

      const overlay = new Overlay({
        element: document.getElementById("popup"),
        positioning: "bottom-center",
        offset: [0, -15],
      });

      map.addOverlay(overlay);
      overlay.setPosition(coordinate);
    }
  };

  useEffect(() => {
    if (map && info) {
      map.on("singleclick", handleInfo);
    }
  }, [map, info]);

  const handleChart = async (evt) => {
    if (chart) {
      const coordinate = evt.coordinate;
      const viewResolution = map.getView().getResolution();

      // Fetch data from WMS
      const wetlandsSource = wetlandsLayer.current.getSource();
      const reservoirsSource = damsLayer.current.getSource();

      const wetlandsFeatureInfoUrl = wetlandsSource?.getFeatureInfoUrl(
        coordinate,
        viewResolution,
        "EPSG:4326",
        { INFO_FORMAT: "application/json" } // Change format if needed
      );

      const reservoirsFeatureInfoUrl = reservoirsSource?.getFeatureInfoUrl(
        coordinate,
        viewResolution,
        "EPSG:4326",
        { INFO_FORMAT: "application/json" } // Change format if needed
      );
      if (wetlandsFeatureInfoUrl) {
        axios.get(wetlandsFeatureInfoUrl).then((res) => {
          setWetlandChart({
            datasets: [
              {
                label: "Wetlands Locations",
                data: res.data?.features?.map((feature) => ({
                  x: feature.geometry.coordinates[0],
                  y: feature.geometry.coordinates[1],
                })),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          });
          setReservoirsChart(null);
        });
      }
      if (reservoirsFeatureInfoUrl) {
        axios.get(reservoirsFeatureInfoUrl).then((res) => {
          setReservoirsChart({
            datasets: [
              {
                label: "Wetlands Locations",
                data: res.data?.features?.map((feature) => ({
                  x: feature.geometry.coordinates[0],
                  y: feature.geometry.coordinates[1],
                })),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          });
          setWetlandChart(null);
        });
        console.log("====================================");
        console.log(reservoirsChart);
        console.log("====================================");
      }
    }
  };

  useEffect(() => {
    if (map && chart) {
      map.on("singleclick", handleChart);
    }
  }, [map, chart]);

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Longitude",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Latitude",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Wetlands Locations",
      },
    },
  };

  //   useEffect(() => {
  //     if (!isLogin) {
  //       router.push("/auth/login");
  //       toast.error("your token has been expired");
  //     } else {
  //       return;
  //     }
  //   }, [isLogin]);

  useEffect(() => {
    if (wetlandsLayer.current) {
      const isVisible = wetlandsLayer.current.getVisible();
      wetlandsLayer.current.setVisible(!isVisible);
      // if (!isVisible && damsLayer.current) {
      //    damsLayer.current.setVisible(false);
      // }
    }
  }, [wetland]);

  useEffect(() => {
    if (floodsLayer.current) {
      const isVisible = floodsLayer.current.getVisible();
      floodsLayer.current.setVisible(!isVisible);
      // if (!isVisible && damsLayer.current) {
      //    damsLayer.current.setVisible(false);
      // }
    }
  }, [floodMap]);

  useEffect(() => {
    if (floodAlertsLayer.current) {
      const isVisible = floodAlertsLayer.current.getVisible();
      floodAlertsLayer.current.setVisible(!isVisible);
      // if (!isVisible && damsLayer.current) {
      //    damsLayer.current.setVisible(false);
      // }
    }
  }, [floodAlert]);

  const handleLayerError = (layer, layerName) => {
    layer.getSource().on("imageloaderror", () => {
      console.error(`Failed to load ${layerName} layer`);
    });
  };

  useEffect(() => {
    if (map) {
      handleLayerError(wetlandsLayer.current, "Wetlands");
      handleLayerError(damsLayer.current, "Reservoirs");
    }
  }, [map]);

  useEffect(() => {
    if (damsLayer.current) {
      const isVisible = damsLayer.current.getVisible();
      damsLayer.current.setVisible(!isVisible);
      // if (!isVisible && wetlandsLayer.current) {
      //    wetlandsLayer.current.setVisible(false);
      // }
    }
  }, [dams]);

  return (
    <div className="flex relative jost h-screen overflow-y-hidden">
      <Tools
        handleRulerButtonClick={handleRulerButtonClick}
        handleAreaButtonClick={handleAreaButtonClick}
        areaFlag={areaFlag}
        isRulerActive={isRulerActive}
        setInfo={setInfo}
        info={info}
        setChart={setChart}
        chart={chart}
      />

      <div className="w-full">
        <div ref={mapElement} style={{ width: "100%", height: "90vh" }}>
          <div id="popup" className={"absolute left-0 top-0"}>
            <div id="popup-content" ref={popupContent} className="relative">
              {info && (
                <div>
                  {info && wetlandsResponse?.length > 0 && (
                    <div
                      className="info-box bg-gray-200 p-[20px]"
                      dangerouslySetInnerHTML={{
                        __html: wetlandsResponse,
                      }}
                    />
                  )}
                  {info && reservoirsResponse?.length > 0 && (
                    <div
                      className="info-box bg-gray-200 p-[20px]"
                      dangerouslySetInnerHTML={{
                        __html: reservoirsResponse,
                      }}
                    />
                  )}
                </div>
              )}
              {!info && (
                <div>
                  {chart && reservoirsChart && (
                    <div className="info-box bg-gray-200 p-[20px]">
                      <Scatter data={reservoirsChart} options={options} />;
                    </div>
                  )}
                  {chart && wetlandChart && (
                    <div className="info-box bg-gray-200 p-[20px]">
                      <Scatter data={wetlandChart} options={options} />;
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <DateSlider />
    </div>
  );
};

export default MapComponents;
