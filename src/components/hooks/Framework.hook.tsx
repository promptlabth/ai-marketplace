import { Framework } from "@/models/interfaces/Framework.interface";
import { apiGetFrameworks } from "@/services/api/FrameworkAPI";
import { useState, useEffect } from "react";

const useFrameworks = () => {
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
  return {
      FrameworkItems: {
    setNameframework,
      data,
      nameframework,
      selectedFrameworkDetails,
    },
  };
};

export default useFrameworks;

// const handleGetFrameworks = async () => {
//     const result = await apiGetFrameworks();
//     if (result) {
//       setData(result.frameworks);
//     }
//   };

  // const RenderComponent = (nameframework: string) => {
  //   switch (nameframework) {
  //     case "RICEE":
  //       return [
  //         {
  //           instruction: "",
  //           context: "",
  //           example: "",
  //           execute: "",
  //         },
  //       ];
  //     case "APE":
  //       return [
  //         {
  //           action: "",
  //           propose: "",
  //           expectation: "",
  //         },
  //       ];
  //     case "TAG":
  //       return [
  //         {
  //           task: "",
  //           action: "",
  //           goal: "",
  //         },
  //       ];
  //     case "ERA":
  //       return [
  //         {
  //           expectation: "",
  //           action: "",
  //         },
  //       ];
  //     case "RPPPP":
  //       return [
  //         {
  //           problem: "",
  //           promise: "",
  //           prove: "",
  //           proposal: "",
  //         },
  //       ];
  //     default:
  //       return [];
  //   }
  // };

  // const { setPrompt } = useGlobal();
  // const [promptFramwork, setPromptFramwork] = useState(
  //   RenderComponent(nameframework)
  // ); // ส่ง nameframework เข้าไปใน RenderComponent
  // // var newPromptFramwork = promptFramwork;/

  // const handleSetPromptFramwork = (index: number, value: string) => {
  //   const keys = Object.keys(promptFramwork[0]);
  //   const key = keys[index];
  //   // Copy the existing promptFramwork array
  //   const newPromptFramwork = [...promptFramwork];

  //   // Update the specific object at the given index
  //   newPromptFramwork[index] = { ...newPromptFramwork[index], [key]: value };

  //   // Update the state
  //   setPromptFramwork(newPromptFramwork);
  //   setPrompt(newPromptFramwork);

  //   console.log("handleSetAPE", `${value} Index`, index);
  // };


  // console.log("Data RenderComponent", RenderComponent(nameframework));
  // // const RPPPP = {
