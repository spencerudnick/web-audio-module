import { IAutomateableParams, IEnumParams, IParams } from "../interfaces/params";
import { NodeType } from "../types/node";

export const automateableParams: IAutomateableParams = {
  [NodeType.Analyser]: [],
  [NodeType.BiquadFilter]: ['Q', 'detune', 'frequency', 'gain'],
  [NodeType.BufferSource]: [],
  [NodeType.ConstantSource]: ['offset'],
  [NodeType.Delay]: ['delayTime'],
  [NodeType.DynamicsCompressor]: ['attack', 'knee', 'ratio', 'release', 'threshold'],
  [NodeType.Gain]: ['gain'],
  [NodeType.MediaElementSource]: [],
  [NodeType.MediaStreamDestination]: [],
  [NodeType.MediaStreamSource]: [],
  [NodeType.MediaStreamTrackSource]: [],
  [NodeType.Oscillator]: ['detune', 'frequency'],
  [NodeType.Panner]: ['orientationX', 'orientationY', 'orientationZ', 'positionX', 'positionY', 'positionZ'],
  [NodeType.StereoPanner]: ['pan'],
  [NodeType.WaveShaper]: [],
}

export const enumParams: IEnumParams = {
  [NodeType.Analyser]: [],
  [NodeType.BiquadFilter]: ['type'],
  [NodeType.BufferSource]: [],
  [NodeType.ConstantSource]: [],
  [NodeType.Delay]: [],
  [NodeType.DynamicsCompressor]: [],
  [NodeType.Gain]: [],
  [NodeType.MediaElementSource]: [],
  [NodeType.MediaStreamDestination]: [],
  [NodeType.MediaStreamSource]: [],
  [NodeType.MediaStreamTrackSource]: [],
  [NodeType.Oscillator]: ['type'],
  [NodeType.Panner]: ['distanceModel', 'panningModel'],
  [NodeType.StereoPanner]: [],
  [NodeType.WaveShaper]: ['oversample'],
}

export const nativeParams = Object.keys(automateableParams).reduce((params, nodeType) => ({
  ...params,
  [nodeType]: [...automateableParams[nodeType], ...enumParams[nodeType]]
}), {}) as IParams;
