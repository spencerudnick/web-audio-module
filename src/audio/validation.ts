import { options } from "./attributes/options";
import { automateableParams, nativeParams } from "./attributes/params";
import { IConnection } from "./interfaces/connection";
import { INode } from "./interfaces/node";
import { ISerializedGraph } from "./interfaces/serialized-graph";
import { ISerializedNode } from "./interfaces/serialized-node";
import { OptionName } from "./types/option-name";
import { AutomateableParamName, ParamName } from "./types/param-name";


export const isValidConnection = (connection: IConnection, serializedGraph: ISerializedGraph) => {
  const sourceNode = serializedGraph.nodes.find(node => node.key === connection.sourceNode.key);
  const targetNode = serializedGraph.nodes.find(node => node.key === connection.targetNode.key);

  if (!sourceNode || !targetNode) {
    return false;
  }

  const connectionIsUnique = serializedGraph.connections.filter(graphConnection => graphConnection.sourceNode.key === connection.sourceNode.key && graphConnection.targetNode.key === connection.targetNode.key && graphConnection.targetParamName === connection.targetParamName).length === 1;

  if (connection.targetParamName) {
    const validNodeParams: AutomateableParamName[] = automateableParams[targetNode.type];
    return connectionIsUnique && validNodeParams.indexOf(connection.targetParamName) > -1;
  }

  return connectionIsUnique;
}


export const isValidNode = (serializedNode: ISerializedNode) => {
  const validNodeParams: ParamName[] = nativeParams[serializedNode.type];
  const validNodeOptions: OptionName[] = options[serializedNode.type];
  return serializedNode.options.every(option => validNodeOptions.indexOf(option.name) > -1);
}


export const connectionsValid = (serializedGraph: ISerializedGraph) => {
  return serializedGraph.connections.every(connection => isValidConnection(connection, serializedGraph));
}


export const nodesValid = (serializedGraph: ISerializedGraph) => {
  return serializedGraph.nodes.every(node => isValidNode(node));
}


export const cyclesValid = (nodes: ISerializedGraph | INode[], connections?: IConnection[]) => {
  if (!(nodes instanceof Array)) {
    connections = nodes.connections;
    nodes = nodes.nodes;
  }
  const _nodes = nodes;
  const matrix = _nodes.reduce((matrix, sourceNode) => ({
    ...matrix,
    [sourceNode.key]: _nodes.reduce((targets, targetNode) => ({
      ...targets,
      [targetNode.key]: connections.some(connection => connection.sourceNode.key === sourceNode.key && connection.targetNode.key === targetNode.key)
    }), {})
  }), {});

  console.log(matrix);
  return false;
}


const graphTests = [connectionsValid, nodesValid, cyclesValid];

export const isValid = (serializedGraph: ISerializedGraph) => {
  return graphTests.every(test => test(serializedGraph));
};
