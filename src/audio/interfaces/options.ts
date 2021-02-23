import { NodeType } from "../types/node";
import { AnalyserOption, BufferSourceOption, BiquadFilterOption, ConstantSourceOption, DelayOption, DynamicsCompressorOption, GainOption, MediaElementSourceOption, MediaStreamDestinationOption, MediaStreamSourceOption, MediaStreamTrackSourceOption, OscillatorOption, PannerOption, StereoPannerOption, WaveShaperOption } from "../types/option-name";

export interface IOptions {
  [NodeType.Analyser]: AnalyserOption[];
  [NodeType.BufferSource]: BufferSourceOption[];
  [NodeType.BiquadFilter]: BiquadFilterOption[];
  [NodeType.ConstantSource]: ConstantSourceOption[];
  [NodeType.Delay]: DelayOption[];
  [NodeType.DynamicsCompressor]: DynamicsCompressorOption[];
  [NodeType.Gain]: GainOption[];
  [NodeType.MediaElementSource]: MediaElementSourceOption[];
  [NodeType.MediaStreamDestination]: MediaStreamDestinationOption[];
  [NodeType.MediaStreamSource]: MediaStreamSourceOption[];
  [NodeType.MediaStreamTrackSource]: MediaStreamTrackSourceOption[];
  [NodeType.Oscillator]: OscillatorOption[];
  [NodeType.Panner]: PannerOption[];
  [NodeType.StereoPanner]: StereoPannerOption[];
  [NodeType.WaveShaper]: WaveShaperOption[];
}
