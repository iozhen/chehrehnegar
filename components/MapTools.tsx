import { LineString } from "ol/geom";
import { Draw } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { getLength as getGeodesicLength } from "ol/sphere";
import { Stroke, Style, Text } from "ol/style";
import React, { useEffect, useRef, useState } from "react";

interface props {
  map: any;
}

const MapTools = ({ map }: props) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [distance, setDistance] = useState<number>(0);
  const drawRef = useRef<Draw | null>(null);
  const sourceRef = useRef<VectorSource>(new VectorSource());

  useEffect(() => {
    if (map) {
      const vectorLayer = new VectorLayer({
        source: sourceRef.current,
        style: new Style({
          stroke: new Stroke({
            color: "blue",
            width: 2,
          }),
        }),
      });
      map.addLayer(vectorLayer);

      // Add Draw interaction for LineString
      const draw = new Draw({
        source: sourceRef.current,
        type: "LineString",
      });
      drawRef.current = draw;
      map.addInteraction(draw);

      let clickCount = 0;

      const handleClick = () => {
        clickCount += 1;

        if (clickCount === 2) {
          draw.finishDrawing(); // Finish drawing after the second click
          map.un("click", handleClick); // Remove click listener after finishing
          clickCount = 0; // Reset the counter for the next drawing
        }
      };

      // Attach the click handler when drawing starts
      draw.on("drawstart", () => {
        map.on("click", handleClick);
      });

      // Measure length when drawing finishes
      draw.on("drawend", (event) => {
        const geometry = event.feature.getGeometry() as LineString;
        const length = getGeodesicLength(geometry, { projection: "EPSG:4326" });
        setDistance(length); // Distance in meters

        // Format the label to show distance in kilometers
        const distanceText = `${(length / 1000).toFixed(2)} km`;

        // Style with distance label
        const lineStyle = new Style({
          stroke: new Stroke({
            color: "blue",
            width: 2,
          }),
          text: new Text({
            text: distanceText,
            font: "14px Calibri,sans-serif",
            fill: new Stroke({ color: "#000" }),
            stroke: new Stroke({ color: "#fff", width: 3 }),
            placement: "line", // Place text along the line
          }),
        });

        // Apply the style with the label to the drawn feature
        event.feature.setStyle(lineStyle);
      });
    }
  }, [map]);

  console.log("distance", distance);

  useEffect(() => {
    if (selectedItem === "length") {
      map?.addInteraction(drawRef.current!);
    } else {
      map?.removeInteraction(drawRef.current!);
      sourceRef.current.clear();
    }
  }, [selectedItem]);
  return (
    <div className=" bg-[#f8f8f8] flex items-center rounded-[20px] p-1">
      <div
        className={
          "flex items-center gap-[10.7px] p-[15px] rounded-[20px] cursor-pointer " +
          (selectedItem == "length" ? "bg-[#cbf3ff]" : "")
        }
        onClick={() => {
          if (selectedItem === "length") {
            setSelectedItem("");
          } else {
            setSelectedItem("length");
          }
        }}
      >
        <img
          src="/icons/ruler.svg"
          alt="ruler"
          className="w-[24px] h-[24px] object-contain"
        />
        <span className="text-[15px]">measure length</span>
      </div>
      {selectedItem === "" && (
        <div className="w-[1px] h-[30px] bg-black flex-shrink-0"></div>
      )}
      <div
        className={
          "flex items-center gap-[10.7px] p-[15px] rounded-[20px] cursor-pointer " +
          (selectedItem === "area" ? "bg-[#cbf3ff]" : "")
        }
        onClick={() => {
          if (selectedItem == "area") {
            setSelectedItem("");
          } else {
            setSelectedItem("area");
          }
        }}
      >
        <img
          src="/icons/area.svg"
          alt="area"
          className="w-[24px] h-[24px] object-contain"
        />
        <span className="text-[15px]">measure area</span>
      </div>
    </div>
  );
};

export default MapTools;
