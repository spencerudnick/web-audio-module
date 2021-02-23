import { IConnection } from "./connection";
import { ISerializedNode } from "./serialized-node";

export interface ISerializedGraph {
  connections: IConnection[];
  nodes: ISerializedNode[];
}
