import { NodeType } from "../types/node";

export const nativeAttributes: any = {
  [NodeType.Analyser]: ['fftSize', 'frequencyBinCount', 'maxDecibels', 'minDecibels', 'smoothingTimeConstant'],
  [NodeType.BiquadFilter]: [],
  [NodeType.BufferSource]: ['buffer', 'loop', 'loopEnd', 'loopStart', 'playbackRate'],
  [NodeType.ChannelMerger]: [],
  [NodeType.ChannelSplitter]: [],
  [NodeType.ConstantSource]: [],
  [NodeType.Convolver]: ['buffer', 'normalize'],
  [NodeType.Delay]: [],
  [NodeType.DynamicsCompressor]: [],
  [NodeType.Gain]: [],
  [NodeType.IIRFilter]: [],
  [NodeType.MediaElementSource]: ['mediaElement'],
  [NodeType.MediaStreamDestination]: ['stream'],
  [NodeType.MediaStreamSource]: ['mediaStream'],
  [NodeType.MediaStreamTrackSource]: ['mediaStreamTrack'],
  [NodeType.Oscillator]: [],
  [NodeType.Panner]: ['coneInnerAngle', 'coneOuterAngle', 'coneOuterGain', 'maxDistance'],
  [NodeType.StereoPanner]: [],
  [NodeType.WaveShaper]: ['curve'],
};
