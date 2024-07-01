import data from "../data/db.json";
import React from "react";

interface teamListType {
  title: string;
}

const Team = () => {
  return (
    <div>
      <img
        src="/images/shadegan_header.png"
        className="w-full block mb-[40px]"
      />

      <div className="w-[75%] mx-auto mb-[70px]">
        <h3 className="text-[35px] font-bold pb-[30px]">Developer Team</h3>

        <ul className="pl-[45px]">
          {data.teamList.map(({ title }: teamListType, index: number) => (
            <li key={index} className="list-disc text-[25px] font-normal">
              {title}
            </li>
          ))}
        </ul>
      </div>

      <img src="/images/shadegan_footer.png" className="w-full opacity-50" />
    </div>
  );
};

export default Team;
