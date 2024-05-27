import React, { useState, useEffect, ChangeEvent } from "react";
import Dropdown from "@/components/Dropdown_framework";
import InputDetial from "@/components/InputDetial";
import { apiGetFrameworks } from "@/services/api/FrameworkAPI";
import { Framework } from "@/models/interfaces/Framework.interface";

import { useGlobal } from "@/context/context";

const FrameworkComponent = () => {
  const [data, setData] = useState<Framework[]>([]);
  const [nameframework, setNameframework] = useState<string>(data[0]?.Name);
  const [selectedFrameworkDetails, setSelectedFrameworkDetails] = useState(
    data[0]
  );

  
  const handleGetFrameworks = async () => {
    const result = await apiGetFrameworks();
    if (result) {
      setData(result.frameworks);
    }
  };

  
  const InitialsPeompt = {
    instruction: "",
    context: "",
    example: "",
    execute: "",
    additionalProperty: "",
    propose: "",
    expectation: "",
    task: "",
    goal: "",
    problem: "",
    promise: "",
    prove: "",
    proposal: "", 
  };

  const [promptFramwork, setPromptFramwork] = useState(InitialsPeompt);

  const { framework_id, setFramworkID,setPrompt, prompt } = useGlobal();

  const handleSetPromptFramwork = (
    index: number,
    value: string,
    key: keyof typeof InitialsPeompt
  ) => {
    if (!promptFramwork || Object.keys(promptFramwork).length === 0) {
      console.log("promptFramwork is null or empty");
      return;
    }

    const newPromptFramwork = { ...promptFramwork };
    newPromptFramwork[key] = value;

    console.log("Updated promptFramwork", newPromptFramwork);
    setPromptFramwork(newPromptFramwork);
  };


  const RenderComponent = (nameframework: string) => {
    switch (nameframework) {
      case "RICEE":
        return [
          {
            instruction: promptFramwork.instruction,
            context: promptFramwork.context,
            example: promptFramwork.example,
            execute: promptFramwork.execute,
          },
        ];
      case "APE":
        return [
          {
            propose: promptFramwork.propose,
            expectation: promptFramwork.expectation,
          },
        ];
      case "TAG":
        return [
          {
            task: promptFramwork.task,
            goal: promptFramwork.goal,
          },
        ];
      case "ERA":
        return [
          {
            expectation: promptFramwork.expectation,
          },
        ];
      case "RPPPP":
        return [
          {
            problem: promptFramwork.problem,
            promise: promptFramwork.promise,
            prove: promptFramwork.prove,
            proposal: promptFramwork.proposal,
          },
        ];
      default:
        return [];
    }
  };
  const handleSetPrompt = () => {
    setPrompt(RenderComponent(nameframework)[0]);
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
    setFramworkID(frameworkDetails?.ID);
  }, [nameframework]);

  useEffect(() => {
    handleSetPrompt();
  }, [promptFramwork]);

  console.log(">> promptFramwork", promptFramwork);
  console.log(">> prompt", prompt);
  console.log(">> framework_id", framework_id);

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
        {selectedFrameworkDetails?.Component?.map((comp, index) => {
          switch (comp.type) {
            case "dropdown":
              return (
                <Dropdown
                  key={index}
                  json_data={nameframework}
                  data={data}
                  label_name={comp.label}
                />
              );
            case "add_text":
              return (
                <InputDetial
                  key={index}
                  detail={comp.label}
                  setValue={(e) => {
                    if (Object.keys(InitialsPeompt).includes(comp.key)) {
                      handleSetPromptFramwork(
                        index,
                        e,
                        comp.key as keyof typeof InitialsPeompt
                      );
                    } else {
                      console.error(`Invalid property name: ${comp.key}`);
                    }
                  }}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default FrameworkComponent;
