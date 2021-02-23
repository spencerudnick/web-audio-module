import { AutomateableParamName } from "../types/param-name";
import { INode } from "./node";

export interface IConnection {
    key: string;
    sourceNode: INode;
    targetNode: INode;
    targetParamName?: AutomateableParamName;
}
