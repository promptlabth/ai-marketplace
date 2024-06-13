// types.ts
export interface InitialsPeompt {
  instruction: string;
  context: string;
  example: string;
  execute: string;
  additionalProperty: string;
  propose: string;
  expectation: string;
  task: string;
  goal: string;
  problem: string;
  promise: string;
  prove: string;
  proposal: string;
  action: string;
}

export const initialPrompt: InitialsPeompt = {
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
  action: "",
};
