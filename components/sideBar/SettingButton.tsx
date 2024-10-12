import { useEffect, useState } from "react";
import data from "@/data/map/submenuItems.json";
import { setMapType } from "@/redux/slices/sidebarSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function SettingButton() {
  const [activeLayer, setActiveLayer] = useState<string>("Open Street Map");
  const router = useRouter();

  const [showLayer1, setShowLayer1] = useState<boolean>(false);
  const [showMapOptions, setShowMapOptions] = useState<boolean>(false);
  const [showLightOptions, setShowLightOptions] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleLayerClick = (layerTitle: string) => {
    // setMapType(layerTitle);
    dispatch(setMapType(layerTitle));
    setActiveLayer(layerTitle);
    if (!router.pathname.includes("map")) {
      router.push("/map");
    }
  };
  useEffect(() => {
    window.addEventListener("click", () => {
      setShowLayer1(false);
    });
  }, []);

  useEffect(() => {
    if (!showLayer1) {
      setShowLightOptions(false);
      setShowMapOptions(false);
    }
  }, [showLayer1]);
  return (
    <div className="relative w-full">
      <div className="flex items-center gap-[17px] relative cursor-pointer">
        <img src={"/icons/plans.svg"} alt="Price plans" />
        <button
          className="w-full text-left text-[#B1B1B1]"
          onClick={(e) => {
            e.stopPropagation();
            setShowLayer1(!showLayer1);
          }}
        >
          Setting
        </button>
      </div>

      {showLayer1 && (
        <div className="absolute left-[100%] bottom-0 bg-white z-50 shadow-xl">
          <div className="w-full relative">
            <button
              className="w-[17.6vw] h-[5.85vh] text-[#B1B1B1]"
              onClick={(e) => {
                e.stopPropagation();
                setShowMapOptions(!showMapOptions);
              }}
            >
              Base Map
            </button>
            {showMapOptions && (
              <div
                className={
                  " flex items-center flex-col pr-[30px] gap-[0.97vh] cursor-pointer w-full absolute bg-white left-[100%] bottom-0 p-[34px] shadow-xl"
                }
              >
                {data.items.map((item) => (
                  <div
                    key={item.title}
                    className={`w-full rounded-[20px] flex items-center justify-center h-[5.46vh] relative bg-center bg-contain px-[10px]  ${
                      activeLayer === item.title
                        ? "border-[#4379EE] border-[5px] "
                        : ""
                    }`}
                    style={{
                      backgroundImage: `url(${item.img})`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLayerClick(item.title);
                    }}
                  >
                    {activeLayer != item.title && (
                      <div className="w-full h-full absolute top-0 left-0 bg-[#00000050] rounded-[20px]"></div>
                    )}
                    <h3 className="font-[500] text-[15px] z-20 flex-shrink-0 text-white">
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full relative">
            <button
              className="w-[17.6vw] h-[5.85vh] text-[#B1B1B1] opacity-30 cursor-default"
              onClick={(e) => {
                e.stopPropagation();
                setShowLightOptions(!showLightOptions);
              }}
            >
              Light Mode
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
