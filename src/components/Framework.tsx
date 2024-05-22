import React, { useState, useEffect } from "react";
import Dropdown from "@/components/Dropdown_framework";
import InputDetial from "@/components/InputDetial";
import { apiGetframeworks } from "@/services/api/FrameworkAPI";
import { Framework } from "@/models/interfaces/Framework.interface";

const FrameworkComponent = () => {
  const [data, setData] = useState<Framework[]>([]);
  const [nameframework, setNameframework] = useState<string>(data[0]?.Name);
  const [selectedFrameworkDetails, setSelectedFrameworkDetails] = useState(
    data[0]
  );

  const handleGetFrameworks = async () => {
    const result = await apiGetframeworks();
    if (result ) {
      setData(result.frameworks);
    }
  };

  useEffect(() => {
    handleGetFrameworks();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setNameframework(data[0]?.Name);
    }
  }, [data]);


  useEffect(() => {
    const frameworkDetails = data.find(
      (framework) => framework.Name === nameframework
    );
    if (frameworkDetails) {
      setSelectedFrameworkDetails(frameworkDetails);
    }
  }, [nameframework]);

  return (
    <div className="flex flex-col w-full h-full">
      <p className="text-white">เลือก Framework ของ AI</p>
      <div className="snap-x snap-mandatory overflow-auto">
        <div className="flex flex-row xl:justify-center space-x-2 p-2">
          {data.map((framework, index) => (
            <button
              key={index}
              className={`flex-none snap-center w-[90px] h-[40px] sm:w-[220px] items-center flex justify-center ${
                nameframework === framework.Name
                  ? "bg-transparent text-white"
                  : "bg-[#03FFAB] text-black"
              } font-bold rounded-xl`}
              onClick={() => {
                setNameframework(framework.Name);
              }}
            >
              {framework.Name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 overflow-x-auto">
        <p className="p-2 mt-4 text-white text-[12px] border-b-2">
          {selectedFrameworkDetails?.Detail}
        </p>
        {
          selectedFrameworkDetails?.Component?.map((comp, index) => {
            switch (comp.type) {
              case "dropdown":
                return (
                  <Dropdown
                    key={index}
                    json_data={nameframework}
                    label_name={comp.label}
                  />
                );
              case "add_text":
                return <InputDetial key={index} detail={comp.label} />;
              default:
                return null;
            }
          })}
      </div>
    </div>
  );
};

export default FrameworkComponent;
