import { NodeType } from "../types/node";

export interface IAnalyser {
  key: string;
  type: NodeType.Analyser;
}

export interface IBiquadFilter {
  key: string;
  type: NodeType.BiquadFilter;
}

export interface IBufferSource {
  key: string;
  type: NodeType.BufferSource;
}

export interface IChannelMerger {
  key: string;
  type: NodeType.ChannelMerger;
}

export interface IChannelSplitter {
  key: string;
  type: NodeType.ChannelSplitter;
}

export interface IConstantSource {
  key: string;
  type: NodeType.ConstantSource;
}

export interface IConvolver {
  key: string;
  type: NodeType.Convolver;
}

export interface IDelay {
  key: string;
  type: NodeType.Delay;
}

export interface IDynamicsCompressor {
  key: string;
  type: NodeType.DynamicsCompressor;
}

export interface IGain {
  key: string;
  type: NodeType.Gain;
}

export interface IIIRFilter {
  key: string;
  type: NodeType.IIRFilter;
}

export interface IMediaElementSource {
  key: string;
  type: NodeType.MediaElementSource;
}

export interface IMediaStreamDestination {
  key: string;
  type: NodeType.MediaStreamDestination;
}

export interface IMediaStreamSource {
  key: string;
  type: NodeType.MediaStreamSource;
}

export interface IMediaStreamTrackSource {
  key: string;
  type: NodeType.MediaStreamTrackSource;
}

export interface IOscillator {
  key: string;
  type: NodeType.Oscillator;
}

export interface IPanner {
  key: string;
  type: NodeType.Panner;
}

export interface IStereoPanner {
  key: string;
  type: NodeType.StereoPanner;
}

export interface IWaveShaper {
  key: string;
  type: NodeType.WaveShaper;
}

export type INode =
  IAnalyser |
  IBiquadFilter |
  IBufferSource |
  IChannelMerger |
  IChannelSplitter |
  IConstantSource |
  IConvolver |
  IDelay |
  IDynamicsCompressor |
  IGain |
  IIIRFilter |
  IMediaElementSource |
  IMediaStreamDestination |
  IMediaStreamSource |
  IMediaStreamTrackSource |
  IOscillator |
  IPanner |
  IStereoPanner |
  IWaveShaper;
