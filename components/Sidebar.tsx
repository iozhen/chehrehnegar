import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { faRulerHorizontal } from "@fortawesome/free-solid-svg-icons";
import { faAreaChart } from "@fortawesome/free-solid-svg-icons";
import { faLineChart } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="w-[3vw] bg-[#2a2b2e] flex flex-col h-[93vh] gap-[2vw] mt-[7vh] pt-[3vh]">
      <button>
        <FontAwesomeIcon
          icon={faMap}
          aria-hidden="true"
          className="text-white"
        />
      </button>
      <button>
        <FontAwesomeIcon
          icon={faLayerGroup}
          aria-hidden="true"
          className="text-white"
        />
      </button>
      <button>
        <FontAwesomeIcon
          icon={faRulerHorizontal}
          aria-hidden="true"
          className="text-white"
        />
      </button>
      <button>
        <FontAwesomeIcon
          icon={faAreaChart}
          aria-hidden="true"
          className="text-white"
        />
      </button>
      <button>
        <FontAwesomeIcon
          icon={faLineChart}
          aria-hidden="true"
          className="text-white"
        />
      </button>
      <button>
        <FontAwesomeIcon
          icon={faInfoCircle}
          aria-hidden="true"
          className="text-white"
        />
      </button>
    </div>
  );
};

export default Sidebar;
