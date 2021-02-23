import { IAnalyserNode, IAudioBufferSourceNode, IAudioContext, IAudioNode, IBiquadFilterNode, IConstantSourceNode, IConvolverNode, IDelayNode, IDynamicsCompressorNode, IGainNode, IIIRFilterNode, IMediaElementAudioSourceNode, IMediaStreamAudioDestinationNode, IMediaStreamAudioSourceNode, IMediaStreamTrackAudioSourceNode, IOscillatorNode, IPannerNode, IStereoPannerNode, IWaveShaperNode, } from "standardized-audio-context";
import { IConnection } from './connection';

interface IConnectionMap { [key: string]: IConnection; }
interface INodeMap<INode extends IAudioNode<IAudioContext>> { [key: string]: INode; }

export interface IGraph {
  connections: IConnectionMap;
  nodes: {
    Analyser: INodeMap<IAnalyserNode<IAudioContext>>,
    BiquadFilter: INodeMap<IBiquadFilterNode<IAudioContext>>,
    BufferSource: INodeMap<IAudioBufferSourceNode<IAudioContext>>,
    ChannelMerger: INodeMap<IAudioNode<IAudioContext>>,
    ChannelSplitter: INodeMap<IAudioNode<IAudioContext>>,
    ConstantSource: INodeMap<IConstantSourceNode<IAudioContext>>,
    Convolver: INodeMap<IConvolverNode<IAudioContext>>,
    Delay: INodeMap<IDelayNode<IAudioContext>>,
    DynamicsCompressor: INodeMap<IDynamicsCompressorNode<IAudioContext>>,
    Gain: INodeMap<IGainNode<IAudioContext>>,
    IIRFilter: INodeMap<IIIRFilterNode<IAudioContext>>,
    MediaElementSource: INodeMap<IMediaElementAudioSourceNode<IAudioContext>>,
    MediaStreamDestination: INodeMap<IMediaStreamAudioDestinationNode<IAudioContext>>,
    MediaStreamSource: INodeMap<IMediaStreamAudioSourceNode<IAudioContext>>,
    MediaStreamTrackSource: INodeMap<IMediaStreamTrackAudioSourceNode<IAudioContext>>,
    Oscillator: INodeMap<IOscillatorNode<IAudioContext>>,
    Panner: INodeMap<IPannerNode<IAudioContext>>,
    StereoPanner: INodeMap<IStereoPannerNode<IAudioContext>>,
    WaveShaper: INodeMap<IWaveShaperNode<IAudioContext>>
  };
}
