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
import { LineString, Point } from "ol/geom";
import { Feature } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Stroke, Style } from "ol/style";
import { getDistance } from "ol/sphere";

const MapComponents: React.FC = () => {
   const [isSubMenu, setIsSubMenu] = useState(false);
   const [mapType, setMapType] = useState("Open Street Map");
   const [isRulerActive, setIsRulerActive] = useState(false);
   const [points, setPoints] = useState<Coordinate[]>([]);
   const mapElement = useRef<HTMLDivElement>(null);
   const [map, setMap] = useState<Map | null>(null);

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

         // Define GeoServer layers
         const allwetlandsLayerPoint = new ImageLayer({
            title: "Wetlands",
            visible: false,
            source: new ImageWMS({
               url: "http://bina.civil.sharif.edu/geoserver/wms",
               params: { LAYERS: "Wetlands:Wetlands" },
               ratio: 1,
               serverType: "geoserver",
            }),
         });

         const alldamsLayerPoint = new ImageLayer({
            title: "Reservoirs",
            visible: false,
            source: new ImageWMS({
               url: "http://bina.civil.sharif.edu/geoserver/wms",
               params: { LAYERS: "allyears:y1987" },
               ratio: 1,
               serverType: "geoserver",
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
               allwetlandsLayerPoint,
               alldamsLayerPoint,
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

   useEffect(() => {
      // Ruler functionality
      if (map && typeof window !== "undefined") {
         map.on("click", (evt) => {
            if (!isRulerActive) return;
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
   }, [map, isRulerActive]);

   return (
      <div className="flex relative mt-[-7vh]">
         <Sidebar
            setIsSubMenu={setIsSubMenu}
            isSubMenu={isSubMenu}
            isRulerActive={isRulerActive}
            setIsRulerActive={setIsRulerActive}
         />

         <div
            className={
               "left-0 top-0 z-40 w-[20%] absolute flex items-center flex-col h-[90vh] bg-[#0000006c] px-[20px] gap-[20px] transition-all duration-500 ease-in-out transform cursor-pointer p-[20px] " +
               (isSubMenu ? "translate-x-0 left-[3.1vw]" : "-translate-x-full")
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
                     setIsSubMenu(!isSubMenu);
                  }}
               >
                  <div className="absolute top-0 left-0 w-full h-full bg-[#0000006c] rounded-[20px]"></div>
                  <h3 className="text-white font-[700] text-[20px] z-20">
                     {item.title}
                  </h3>
               </div>
            ))}
         </div>

         <div ref={mapElement} style={{ width: "100%", height: "90vh" }}>
            {/* <div id="layerBoxText"></div> */}
         </div>
      </div>
   );
};

export default MapComponents;
