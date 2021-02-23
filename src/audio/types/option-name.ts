import {
  IAnalyserOptions,
  IAudioBufferSourceOptions,
  IBiquadFilterOptions,
  IConstantSourceOptions,
  IDelayOptions,
  IGainOptions,
  IMediaElementAudioSourceOptions,
  IMediaStreamAudioDestinationNode,
  IMediaStreamAudioSourceOptions,
  IMediaStreamTrackAudioSourceOptions,
  IOscillatorOptions,
  IPannerOptions,
  IStereoPannerOptions,
  IWaveShaperOptions
} from "standardized-audio-context";

export type AnalyserOption = keyof IAnalyserOptions;
export type BiquadFilterOption = keyof IBiquadFilterOptions;
export type BufferSourceOption = keyof IAudioBufferSourceOptions;
export type ConstantSourceOption = keyof IConstantSourceOptions;
export type DelayOption = keyof IDelayOptions;
export type DynamicsCompressorOption = keyof DynamicsCompressorOptions;
export type GainOption = keyof IGainOptions;
export type MediaElementSourceOption = keyof IMediaElementAudioSourceOptions;
export type MediaStreamDestinationOption = undefined;
export type MediaStreamSourceOption = keyof IMediaStreamAudioSourceOptions;
export type MediaStreamTrackSourceOption = keyof IMediaStreamTrackAudioSourceOptions;
export type OscillatorOption = keyof IOscillatorOptions;
export type PannerOption = keyof IPannerOptions;
export type StereoPannerOption = keyof IStereoPannerOptions;
export type WaveShaperOption = keyof IWaveShaperOptions;

export type OptionName = AnalyserOption |
  BiquadFilterOption |
  BufferSourceOption |
  ConstantSourceOption |
  DelayOption |
  DynamicsCompressorOption |
  GainOption |
  MediaElementSourceOption |
  MediaStreamSourceOption |
  MediaStreamTrackSourceOption |
  OscillatorOption |
  PannerOption |
  StereoPannerOption |
  WaveShaperOption;
