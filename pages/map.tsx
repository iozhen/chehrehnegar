import React, { useEffect, useRef, useState } from "react";
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
import data from "@/data/map/submenuItems.json";
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

ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale);

const MapComponents: React.FC = () => {
   const [isSubMenu, setIsSubMenu] = useState(0);
   const [mapType, setMapType] = useState("Open Street Map");
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
   const popupContent = useRef();

   const wetlandsLayer = useRef(
      new ImageLayer({
         title: "Wetlands",
         visible: false,
         source: new ImageWMS({
            url: "http://bina.civil.sharif.edu/geoserver/wms",
            params: { LAYERS: "Wetlands:Wetlands" },
            ratio: 1,
            serverType: "geoserver",
         }),
      })
   );

   const damsLayer = useRef(
      new ImageLayer({
         title: "Reservoirs",
         visible: false,
         source: new ImageWMS({
            url: "http://bina.civil.sharif.edu/geoserver/wms",
            params: { LAYERS: "allyears:y1987" },
            ratio: 1,
            serverType: "geoserver",
         }),
      })
   );

   useEffect(() => {
      if (typeof window !== "undefined") {
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

         const water = new TileLayer({
            title: "Water Color",
            visible: false,
            source: new XYZ({
               url: "http://{a-d}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",
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
               water,
               wetlandsLayer.current, // Add wetlandsLayer
               damsLayer.current, // Add damsLayer
               vectorLayer, // Add vectorLayer to map
            ],
         });

         setMap(newMap);

         // Cleanup on component unmount
         return () => newMap.setTarget(undefined);
      }
   }, []);

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
               return `${coordinate[0].toFixed(6)}, ${coordinate[1].toFixed(
                  6
               )}`;
            },
         });

         const scaleControl = new ScaleLine({
            bar: true,
         });

         map.addControl(mousePosition);
         map.addControl(scaleControl);
      }
   }, [map]);

   const addInteraction = () => {
      const newDraw = new Draw({
         source: vectorSource,
         type: "Polygon",
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
         overlay.setPosition(polygon.getInteriorPoint().getCoordinates());
         map.addOverlay(overlay);
      });

      setDraw(newDraw);
      map.addInteraction(newDraw);
   };

   const handleRulerButtonClick = () => {
      setIsRulerActive(!isRulerActive);
      if (map && typeof window !== "undefined" && isRulerActive) {
         map.on("click", (evt) => {
            const clickedPoint = evt.coordinate;
            setPoints((prevPoints) => {
               const newPoints = [...prevPoints, clickedPoint];

               if (newPoints.length === 2) {
                  const line = new LineString(newPoints);
                  const distance = getDistance(
                     fromLonLat(newPoints[0]),
                     fromLonLat(newPoints[1])
                  );
                  const distanceFeature = new Feature({
                     geometry: line,
                  });

                  distanceFeature.setStyle(
                     new Style({
                        stroke: new Stroke({
                           color: "#ffcc33",
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

                  map.addLayer(vectorLayer);

                  const [start, end] = newPoints;
                  const midPoint = [
                     (start[0] + end[0]) / 2,
                     (start[1] + end[1]) / 2,
                  ];

                  const distanceOverlay = new Overlay({
                     element: document.createElement("div"),
                     position: midPoint,
                     positioning: "bottom-center",
                  });

                  distanceOverlay.getElement().innerHTML = `${distance.toFixed(
                     2
                  )} meters`;
                  distanceOverlay.getElement().style.color = "black";
                  distanceOverlay.getElement().style.backgroundColor = "white";
                  distanceOverlay.getElement().style.padding = "5px";
                  distanceOverlay.getElement().style.borderRadius = "5px";

                  map.addOverlay(distanceOverlay);

                  setPoints([]);
               } else {
                  return newPoints;
               }
            });
         });
      }
   };

   const handleAreaButtonClick = () => {
      setAreaFlag(!areaFlag);

      if (areaFlag) {
         if (draw) {
            map.removeInteraction(draw);
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

   const handleWetlandsToggle = () => {
      if (wetlandsLayer.current) {
         const isVisible = wetlandsLayer.current.getVisible();
         wetlandsLayer.current.setVisible(!isVisible);
         // if (!isVisible && damsLayer.current) {
         //    damsLayer.current.setVisible(false);
         // }
      }
   };

   const handleDamsToggle = () => {
      if (damsLayer.current) {
         const isVisible = damsLayer.current.getVisible();
         damsLayer.current.setVisible(!isVisible);
         // if (!isVisible && wetlandsLayer.current) {
         //    wetlandsLayer.current.setVisible(false);
         // }
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

   return (
      <div className="flex relative mt-[-7vh]">
         <Sidebar
            setIsSubMenu={setIsSubMenu}
            isSubMenu={isSubMenu}
            handleRulerButtonClick={handleRulerButtonClick}
            handleAreaButtonClick={handleAreaButtonClick}
            areaFlag={areaFlag}
            isRulerActive={isRulerActive}
            setInfo={setInfo}
            info={info}
            setChart={setChart}
            chart={chart}
         />

         <div
            className={
               "left-0 top-0 z-40 w-[20%] absolute flex items-center flex-col h-[90vh] bg-[#0000006c] px-[20px] gap-[20px] transition-all duration-500 ease-in-out transform cursor-pointer p-[20px] " +
               (isSubMenu === 1
                  ? "translate-x-0 left-[3.1vw]"
                  : "-translate-x-full")
            }
         >
            {data.items.map((item) => (
               <div
                  key={item.title}
                  className="w-full rounded-[20px] flex items-center justify-center h-[80px] relative"
                  style={{
                     backgroundImage: `url(${item.img})`,
                  }}
                  onClick={() => {
                     setMapType(item.title);
                     setIsSubMenu(0);
                  }}
               >
                  <div className="absolute top-0 left-0 w-full h-full bg-[#0000006c] rounded-[20px]"></div>
                  <h3 className="text-white font-[700] text-[20px] z-20">
                     {item.title}
                  </h3>
               </div>
            ))}
         </div>
         <div
            className={
               "left-0 top-0 z-40 w-[20%] absolute flex items-center flex-col h-[90vh] bg-[#0000006c] px-[20px] gap-[20px] transition-all duration-500 ease-in-out transform cursor-pointer p-[20px] " +
               (isSubMenu === 2
                  ? "translate-x-0 left-[3.1vw]"
                  : "-translate-x-full")
            }
         >
            <button
               className="w-full h-[50px] bg-blue-500 text-white rounded-[10px] mt-4"
               onClick={handleWetlandsToggle}
            >
               Toggle Wetlands
            </button>
            <button
               className="w-full h-[50px] bg-blue-500 text-white rounded-[10px] mt-4"
               onClick={handleDamsToggle}
            >
               Toggle Reservoirs
            </button>
         </div>

         <div ref={mapElement} style={{ width: "100%", height: "90vh" }}>
            <div id="popup" className={info ? "ol-popup " : "popup "}>
               <div id="popup-content" ref={popupContent} className="relative">
                  {info && wetlandsResponse?.length > 0 && (
                     <div
                        className="info-box bg-gray-200 p-[20px]"
                        dangerouslySetInnerHTML={{ __html: wetlandsResponse }}
                     />
                  )}
                  {info && reservoirsResponse?.length > 0 && (
                     <div
                        className="info-box bg-gray-200 p-[20px]"
                        dangerouslySetInnerHTML={{ __html: reservoirsResponse }}
                     />
                  )}

                  {chart && reservoirsChart && (
                     <div className="absolute bg-slate-200 p-[15px] rounded-[10px] left-0 z-30">
                        <Scatter data={reservoirsChart} options={options} />;
                     </div>
                  )}
                  {chart && wetlandChart && (
                     <div className="absolute bg-slate-200 p-[15px] rounded-[10px] left-0 z-30">
                        <Scatter data={wetlandChart} options={options} />;
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default MapComponents;
