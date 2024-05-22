import { JsonFrameworkMessage } from "../types/framework.type";

export interface Framework {
  ID: string;
  Name: string;
  Detail: string;
  Component: JsonFrameworkMessage[];
}
