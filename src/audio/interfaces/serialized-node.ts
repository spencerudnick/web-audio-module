import { NodeType } from "../types/node";
import { ISerializedOption } from "./serialized-option";

export interface ISerializedNode {
  key: string;
  type: NodeType;
  options: ISerializedOption[];
  attributes?: any[];
}
