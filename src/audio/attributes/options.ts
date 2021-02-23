import { NodeType } from "../types/node"
import { IOptions } from "../interfaces/options"
import { IAudioNodeOptions } from "standardized-audio-context"

const commonOptions: (keyof IAudioNodeOptions)[] = ['channelCount', 'channelCountMode', 'channelInterpretation'];

export const options: IOptions = {
  [NodeType.Analyser]: [...commonOptions, 'fftSize', 'maxDecibels', 'minDecibels', 'smoothingTimeConstant'],
  [NodeType.BufferSource]: [...commonOptions, 'buffer', 'loop', 'loopEnd', 'loopStart', 'playbackRate'],
  [NodeType.BiquadFilter]: [...commonOptions, 'Q', 'detune', 'frequency', 'gain', 'type'],
  [NodeType.ConstantSource]: [...commonOptions, 'offset'],
  [NodeType.Delay]: [...commonOptions, 'delayTime', 'maxDelayTime'],
  [NodeType.DynamicsCompressor]: [...commonOptions, 'attack', 'knee', 'ratio', 'release', 'threshold'],
  [NodeType.Gain]: [...commonOptions, 'gain'],
  [NodeType.MediaElementSource]: ['mediaElement'],
  [NodeType.MediaStreamDestination]: [],
  [NodeType.MediaStreamSource]: ['mediaStream'],
  [NodeType.MediaStreamTrackSource]: ['mediaStreamTrack'],
  [NodeType.Oscillator]: [...commonOptions, 'detune', 'frequency', 'periodicWave', 'type'],
  [NodeType.Panner]: [...commonOptions, 'coneInnerAngle', 'coneOuterAngle', 'coneOuterGain', 'distanceModel', 'maxDistance', 'orientationX', 'orientationY', 'orientationZ', 'panningModel'],
  [NodeType.StereoPanner]: [...commonOptions, 'pan'],
  [NodeType.WaveShaper]: [...commonOptions, 'curve', 'oversample']
};
