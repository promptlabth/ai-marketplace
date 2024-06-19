import React, { useState, useEffect, ChangeEvent } from "react";
import { GetFrameworks } from "@/services/api/FrameworkAPI";
import { Framework } from "@/models/interfaces/Framework.interface";

import { useGlobal } from "@/context/context";
import {
  InitialsPeompt,
  initialPrompt,
} from "@/models/interfaces/InitialsPeompt.interface";
import { useTranslation } from "react-i18next";

const useFrameworks = () => {
  const [data, setData] = useState<Framework[]>([]);
  const [nameframework, setNameframework] = useState<string>("");
  const [selectedFrameworkDetails, setSelectedFrameworkDetails] = useState(
    data[0]
  );
  const { i18n } = useTranslation();
  const handleGetFrameworks = async () => {
    const result = await GetFrameworks(i18n.language);
    console.log("frameworks call");
    if (result) {
      console.log("frameworks", result.frameworks);
      setData(result.frameworks);
    }
  };

  const [promptFramwork, setPromptFramwork] =
    useState<InitialsPeompt>(initialPrompt);

  const { setFramworkID, setPrompt } = useGlobal();

  const handleSetPromptFramwork = (
    value: string,
    key: keyof typeof initialPrompt
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
            action: promptFramwork.action,
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
  const isKeyOfInitialsPeompt = (key: string): keyof InitialsPeompt | null => {
    const initialPromptKeys: (keyof InitialsPeompt)[] = [
      "instruction",
      "context",
      "example",
      "execute",
      "additionalProperty",
      "propose",
      "expectation",
      "task",
      "goal",
      "problem",
      "promise",
      "prove",
      "proposal",
      "action",
    ];
    return initialPromptKeys.includes(key as keyof InitialsPeompt)
      ? (key as keyof InitialsPeompt)
      : null;
  };

  const handleSetPrompt = () => {
    setPrompt(RenderComponent(nameframework)[0]);
  };

  useEffect(() => {
    handleGetFrameworks();
  }, []);

  useEffect(() => {
    handleGetFrameworks();
  }, [i18n.language]);

  useEffect(() => {
    const oldNameframework = nameframework;
    if (data.length > 0 && nameframework == "") {
      setNameframework(data[0]?.Name);
    } else if (nameframework != "" && nameframework != data[0]?.Name) {
      setNameframework("");
      setTimeout(() => {
        setNameframework(oldNameframework);
      }, 10);
    } else if (nameframework != "") {
      setNameframework("");
      setTimeout(() => {
        setNameframework(oldNameframework);
      }, 10);
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

  return {
    FrameworkItems: {
      setNameframework,
      data,
      nameframework,
      selectedFrameworkDetails,
      initialPrompt,
      handleSetPromptFramwork,
      promptFramwork,
      isKeyOfInitialsPeompt,
    },
  };
};

export default useFrameworks;
