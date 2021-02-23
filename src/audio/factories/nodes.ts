import { IAudioContext, IOfflineAudioContext, isAnyAudioContext } from "standardized-audio-context";
import { NodeType } from "../types/node";

export const nodeFactory = (type: NodeType, context: IAudioContext | IOfflineAudioContext) => ({
  ...(isAnyAudioContext(context) ? {
    [NodeType.MediaElementSource]: context.createMediaElementSource.bind(context),
    [NodeType.MediaStreamDestination]: context.createMediaStreamDestination.bind(context),
    [NodeType.MediaStreamSource]: context.createMediaStreamSource.bind(context),
    [NodeType.MediaStreamTrackSource]: context.createMediaStreamTrackSource.bind(context)
  } : {}),
  [NodeType.Analyser]: context.createAnalyser.bind(context),
  [NodeType.BiquadFilter]: context.createBiquadFilter.bind(context),
  [NodeType.BufferSource]: context.createBufferSource.bind(context),
  [NodeType.ChannelMerger]: context.createChannelMerger.bind(context),
  [NodeType.ChannelSplitter]: context.createChannelSplitter.bind(context),
  [NodeType.ConstantSource]: context.createConstantSource.bind(context),
  [NodeType.Convolver]: context.createConvolver.bind(context),
  [NodeType.Delay]: context.createDelay.bind(context),
  [NodeType.DynamicsCompressor]: context.createDynamicsCompressor.bind(context),
  [NodeType.Gain]: context.createGain.bind(context),
  [NodeType.IIRFilter]: context.createIIRFilter.bind(context),
  [NodeType.Oscillator]: context.createOscillator.bind(context),
  [NodeType.Panner]: context.createPanner.bind(context),
  [NodeType.StereoPanner]: context.createStereoPanner.bind(context),
  [NodeType.WaveShaper]: context.createWaveShaper.bind(context),
} as any)[type];
