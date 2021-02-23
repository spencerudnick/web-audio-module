import { NodeType } from "../types/node";
import {
  AutomateableBiquadFilterParam,
  AutomateableConstantSourceParam,
  AutomateableDelayParam,
  AutomateableDynamicsCompressorParam,
  AutomateableGainParam,
  AutomateableOscillatorParam,
  AutomateablePannerParam,
  AutomateableStereoPannerParam
} from "../types/param-name";
import {
  EnumBiquadFilterParam,
  EnumOscillatorParam,
  EnumPannerParam,
  EnumWaveShaperParam
} from "../types/param-name";

export interface IAutomateableParams {
  [NodeType.Analyser]: undefined[];
  [NodeType.BufferSource]: undefined[];
  [NodeType.BiquadFilter]: AutomateableBiquadFilterParam[];
  [NodeType.ConstantSource]: AutomateableConstantSourceParam[];
  [NodeType.Delay]: AutomateableDelayParam[];
  [NodeType.DynamicsCompressor]: AutomateableDynamicsCompressorParam[];
  [NodeType.Gain]: AutomateableGainParam[];
  [NodeType.MediaElementSource]: undefined[];
  [NodeType.MediaStreamDestination]: undefined[];
  [NodeType.MediaStreamSource]: undefined[];
  [NodeType.MediaStreamTrackSource]: undefined[];
  [NodeType.Oscillator]: AutomateableOscillatorParam[];
  [NodeType.Panner]: AutomateablePannerParam[];
  [NodeType.StereoPanner]: AutomateableStereoPannerParam[];
  [NodeType.WaveShaper]: undefined[];
}

export interface IEnumParams {
  [NodeType.Analyser]: undefined[];
  [NodeType.BufferSource]: undefined[];
  [NodeType.BiquadFilter]: EnumBiquadFilterParam[];
  [NodeType.ConstantSource]: undefined[];
  [NodeType.Delay]: undefined[];
  [NodeType.DynamicsCompressor]: undefined[];
  [NodeType.Gain]: undefined[];
  [NodeType.MediaElementSource]: undefined[];
  [NodeType.MediaStreamDestination]: undefined[];
  [NodeType.MediaStreamSource]: undefined[];
  [NodeType.MediaStreamTrackSource]: undefined[];
  [NodeType.Oscillator]: EnumOscillatorParam[];
  [NodeType.Panner]: EnumPannerParam[];
  [NodeType.StereoPanner]: undefined[];
  [NodeType.WaveShaper]: EnumWaveShaperParam[];
}

export interface IParams {
  [NodeType.Analyser]: undefined[];
  [NodeType.BufferSource]: undefined[];
  [NodeType.BiquadFilter]: (AutomateableBiquadFilterParam | EnumBiquadFilterParam)[];
  [NodeType.ConstantSource]: AutomateableConstantSourceParam[];
  [NodeType.Delay]: AutomateableDelayParam[];
  [NodeType.DynamicsCompressor]: AutomateableDynamicsCompressorParam[];
  [NodeType.Gain]: AutomateableGainParam[];
  [NodeType.MediaElementSource]: undefined[];
  [NodeType.MediaStreamDestination]: undefined[];
  [NodeType.MediaStreamSource]: undefined[];
  [NodeType.MediaStreamTrackSource]: undefined[];
  [NodeType.Oscillator]: (AutomateableOscillatorParam | EnumOscillatorParam)[];
  [NodeType.Panner]: (AutomateablePannerParam | EnumPannerParam)[];
  [NodeType.StereoPanner]: AutomateableStereoPannerParam[];
  [NodeType.WaveShaper]: EnumWaveShaperParam[];
}
