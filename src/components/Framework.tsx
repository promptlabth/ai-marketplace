import React from "react";
import Dropdown from "@/components/DropdownFramework";
import InputDetailFramework from "./InputDetialFramework";
import useFrameworks from "./hooks/Framework.hook";
import { TFunction } from "next-i18next";

interface FrameworkProps {
  translations: TFunction;
}

const FrameworkComponent: React.FC<FrameworkProps> = ({ translations }) => {
  const { FrameworkItems } = useFrameworks();
  return (
    <div className="flex flex-col w-full h-full">
      <p className="text-white">{translations("editAagent.framework.title")}</p>
      <div className="snap-x snap-mandatory overflow-auto">
        <div className="flex flex-row xl:justify-center space-x-2 p-2 scroll-container">
          {FrameworkItems.data.length !== 0 ? (
            FrameworkItems.data.map((framework, index) => (
              <button
                key={index}
                className={`flex-none snap-center w-[90px] h-[40px] sm:w-[220px] items-center flex justify-center ${
                  FrameworkItems.nameframework === framework.Name
                    ? "bg-transparent text-white"
                    : "bg-[#03FFAB] text-black"
                } font-bold rounded-xl`}
                onClick={() => {
                  FrameworkItems.setNameframework(framework.Name);
                }}
              >
                {framework.Name}
              </button>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      {FrameworkItems.data.length !== 0 ? (
        <div className="flex w-full flex-col gap-3 overflow-x-auto">
          <p className="p-2 mt-4 text-white text-[12px] border-b-2">
            {FrameworkItems.selectedFrameworkDetails?.Detail}
          </p>
          {FrameworkItems.selectedFrameworkDetails?.Component?.map(
            (comp, index) => {
              switch (comp.type) {
                case "dropdown":
                  return (
                    <Dropdown
                      key={index}
                      json_data={FrameworkItems.nameframework}
                      data={FrameworkItems.data}
                      label_name={comp.label}
                    />
                  );
                case "add_text":
                  return (
                    <InputDetailFramework
                      key={index}
                      detail={comp.label}
                      promptValues={
                        FrameworkItems.promptFramwork[
                          FrameworkItems.isKeyOfInitialsPeompt(comp.key) ??
                            "context"
                        ]
                      }
                      setValue={(value: string) => {
                        if (
                          Object.keys(FrameworkItems.initialPrompt).includes(
                            comp.key
                          )
                        ) {
                          FrameworkItems.handleSetPromptFramwork(
                            value,
                            comp.key as keyof typeof FrameworkItems.initialPrompt
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
            }
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FrameworkComponent;
