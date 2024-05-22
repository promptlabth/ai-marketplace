export interface Framework {
  ID: string;
  Name: string;
  Detail: string;
  Component: JsonMessage[];
}

type JsonMessage = {
  type: string;
  label: string;
  role: string[];
};
