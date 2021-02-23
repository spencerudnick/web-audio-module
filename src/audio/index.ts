import {
    AudioContext,
    IAudioContext,
    IAudioBuffer,
    IAudioWorklet,
    IPeriodicWave,
    IPeriodicWaveConstraints,
    TDecodeErrorCallback,
    TDecodeSuccessCallback,
    isAnyAudioContext,
    IAnalyserNode,
    IAudioBufferSourceNode,
    IBiquadFilterNode,
    IConstantSourceNode,
    IConvolverNode,
    IDelayNode,
    IDynamicsCompressorNode,
    IGainNode,
    IIIRFilterNode,
    IMediaElementAudioSourceNode,
    IMediaStreamAudioDestinationNode,
    IMediaStreamAudioSourceNode,
    IMediaStreamTrackAudioSourceNode,
    IOscillatorNode,
    IPannerNode,
    IStereoPannerNode,
    IWaveShaperNode,
    IOfflineAudioContext,
    isAnyOfflineAudioContext
} from 'standardized-audio-context';

import { v4 as uuid } from 'uuid';

import { nodeFactory } from './factories/nodes';

import { IConnection } from './interfaces/connection';
import { IGraph } from './interfaces/graph';
import { IAnalyser, IBiquadFilter, IBufferSource, IChannelMerger, IChannelSplitter, IConstantSource, IConvolver, IDelay, IDynamicsCompressor, IGain, IIIRFilter, IMediaElementSource, IMediaStreamDestination, IMediaStreamSource, IMediaStreamTrackSource, INode, IOscillator, IPanner, IStereoPanner, IWaveShaper } from './interfaces/node';
import { IOptions } from './interfaces/options';
import { IAutomateableParams, IEnumParams, IParams } from './interfaces/params';
import { ISerializedGraph } from './interfaces/serialized-graph';
import { ISerializedNode } from './interfaces/serialized-node';
import { ISerializedOption } from './interfaces/serialized-option';

import { NodeType } from './types/node';
import { OptionName } from './types/option-name';
import { AutomateableBiquadFilterParam, AutomateableBufferSourceParam, AutomateableConstantSourceParam, AutomateableDelayParam, AutomateableDynamicsCompressorParam, AutomateableGainParam, AutomateableOscillatorParam, AutomateablePannerParam, AutomateableParamName, AutomateableStereoPannerParam, EnumBiquadFilterParam, EnumOscillatorParam, EnumPannerParam, EnumParamName, EnumWaveShaperParam, ParamName } from './types/param-name';


import { cyclesValid, isValid } from './validation';
import { nativeAttributes } from './attributes/attributes';
import { automateableParams, enumParams, nativeParams } from './attributes/params';
import { options } from './attributes/options';

interface INodeRetriever {
    (key: IAnalyser): IAnalyserNode<IAudioContext>;
    (key: IBiquadFilter): IBiquadFilterNode<IAudioContext>;
    (key: IBufferSource): IAudioBufferSourceNode<IAudioContext>;
    (key: IChannelMerger): ChannelMergerNode;
    (key: IChannelSplitter): ChannelSplitterNode;
    (key: IConstantSource): IConstantSourceNode<IAudioContext>;
    (key: IConvolver): IConvolverNode<IAudioContext>;
    (key: IDelay): IDelayNode<IAudioContext>;
    (key: IDynamicsCompressor): IDynamicsCompressorNode<IAudioContext>;
    (key: IGain): IGainNode<IAudioContext>;
    (key: IIIRFilter): IIIRFilterNode<IAudioContext>;
    (key: IMediaElementSource): IMediaElementAudioSourceNode<IAudioContext>;
    (key: IMediaStreamDestination): IMediaStreamAudioDestinationNode<IAudioContext>;
    (key: IMediaStreamSource): IMediaStreamAudioSourceNode<IAudioContext>;
    (key: IMediaStreamTrackSource): IMediaStreamTrackAudioSourceNode<IAudioContext>;
    (key: IOscillator): IOscillatorNode<IAudioContext>;
    (key: IPanner): IPannerNode<IAudioContext>;
    (key: IStereoPanner): IStereoPannerNode<IAudioContext>;
    (key: IWaveShaper): IWaveShaperNode<IAudioContext>;
}

interface IParameterUpdater {
    (key: IBiquadFilter, paramName: AutomateableBiquadFilterParam | EnumBiquadFilterParam, value: number | string, time?: number): void;
    (key: IBufferSource, paramName: AutomateableBufferSourceParam, value: number | string, time?: number): void;
    (key: IConstantSource, paramName: AutomateableConstantSourceParam, value: number | string, time?: number): void;
    (key: IDelay, paramName: AutomateableDelayParam, value: number | string, time?: number): void;
    (key: IDynamicsCompressor, paramName: AutomateableDynamicsCompressorParam, value: number | string, time?: number): void;
    (key: IGain, paramName: AutomateableGainParam, value: number | string, time?: number): void;
    (key: IOscillator, paramName: AutomateableOscillatorParam | EnumOscillatorParam, value: number | string, time?: number): void;
    (key: IPanner, paramName: AutomateablePannerParam | EnumPannerParam, value: number | string, time?: number): void;
    (key: IStereoPanner, paramName: AutomateableStereoPannerParam, value: number | string, time?: number): void;
    (key: IWaveShaper, paramName: EnumWaveShaperParam, value: number | string, time?: number): void;
}

interface IDisconnector {
    (connectionKey: string): void;
    (connectionKey: INode, target?: INode, targetParamName?: AutomateableParamName): void;
}

export const attributesFor = (key: INode | NodeType) => {
    return nativeAttributes[typeof key === 'object' ? key.type : key];
}

export const paramsFor = (key: INode | NodeType) => {
    return nativeParams[typeof key === 'object' ? key.type : key];
}

export default class Audio<Context extends (IAudioContext | IOfflineAudioContext)> {
    private _graph: IGraph = {
        connections: {},
        nodes: {
            Analyser: {},
            BiquadFilter: {},
            BufferSource: {},
            ChannelMerger: {},
            ChannelSplitter: {},
            ConstantSource: {},
            Convolver: {},
            Delay: {},
            DynamicsCompressor: {},
            Gain: {},
            IIRFilter: {},
            MediaElementSource: {},
            MediaStreamDestination: {},
            MediaStreamSource: {},
            MediaStreamTrackSource: {},
            Oscillator: {},
            Panner: {},
            StereoPanner: {},
            WaveShaper: {}
        }
    };

    constructor(private _context: Context = new AudioContext() as Context, serializedGraph?: ISerializedGraph) {
        if (!isAnyAudioContext(_context) && !isAnyOfflineAudioContext(_context)) {
            const message = 'Unable to initialize graph. Provided context must be some type of AudioContext.';
            console.error(message);
            throw new TypeError(message);
        }

        if (serializedGraph && isValid(serializedGraph)) {
            this._import(serializedGraph);
        }
    }

    private _uniqueId = () => {
        return uuid() as string;
    }

    private _import = (serializedGraph: ISerializedGraph) => {
        console.log(serializedGraph);
    }

    private _createNode = (type: NodeType, ...args: any[]) => {
        const key = this._uniqueId();
        this._graph.nodes[type][key] = nodeFactory(type, this._context)(...args);
        return { key, type };
    }

    connections = () => {
        return Object.values(this._graph.connections);
    }

    nodes = () => {
        const nodes = [];
        const nodeTypes = Object.keys(this._graph.nodes);
        nodeTypes.forEach(type => {
            Object.entries(this._graph.nodes[type]).forEach(([key]) => {
                nodes.push({
                    key,
                    type
                });
            });
        });
        return nodes;
    }

    connect = (source: INode, target: INode, paramName?: AutomateableParamName) => {
        const result = (() => {
            if (!Object.values(this._graph.connections).some(connection =>
                connection.sourceNode.key === source.key && connection.targetNode.key === target.key && connection.targetParamName === paramName
            )) {
                const key = this._uniqueId();
                const sourceNode = this.node(source as any);
                const targetNode = this.node(target as any);
                if (paramName && automateableParams[target.type].includes(paramName)) {
                    sourceNode.connect(targetNode[paramName]);
                    this._graph.connections[key] = {
                        key,
                        sourceNode: { ...source },
                        targetNode: { ...target },
                        targetParamName: paramName
                    };

                } else if (paramName) {
                    console.warn(`Attempted to connect to ${paramName} which is not an automateable parameter of ${target.type} nodes.`);
                } else {
                    sourceNode.connect(targetNode);
                    this._graph.connections[key] = {
                        key,
                        sourceNode: { ...source },
                        targetNode: { ...target }
                    };
                }
                return key;
            } else {
                console.warn('Attempted to create a duplicate connection');
                return Object.entries(this._graph.connections).find(([, connection]) =>
                    connection.sourceNode.key === source.key && connection.targetNode.key === target.key && connection.targetParamName === paramName
                )[0];
            }
        })();
        if (!cyclesValid([], [])) { }

        return result;
    }

    disconnect: IDisconnector = (connectionKey: string | INode, target?: INode, targetParamName?: AutomateableParamName) => {
        let connection: IConnection;
        if (typeof connectionKey !== 'string' && target) {
            connection = Object.values(this._graph.connections).find(connection => (
                connection.sourceNode.key === (connectionKey as INode).key && connection.targetNode.key === target.key && connection.targetParamName === targetParamName
            ));
        }
        else if (typeof connectionKey === 'string' && connectionKey in this._graph.connections) {
            connection = this._graph.connections[connectionKey];
        } else {
            console.warn(`Attempted to disconnect unregistered connection ${connectionKey}.`);
            return;
        }
        const sourceNode = this.node(connection.sourceNode as any);
        const targetNode = this.node(connection.targetNode as any);
        const paramName = connection.targetParamName;
        if (paramName) {
            sourceNode.disconnect(targetNode[paramName]);
        } else {
            sourceNode.disconnect(targetNode);
        }
        delete this._graph.connections[connection.key];
    };

    node = ((key: INode) => {
        if (!(key.key in this._graph.nodes[key.type])) {
            throw new ReferenceError('NodeKey does not match a node in the graph');
        }

        switch (key.type) {
            case NodeType.Analyser:
                return this._graph.nodes.Analyser[key.key];
            case NodeType.BiquadFilter:
                return this._graph.nodes.BiquadFilter[key.key];
            case NodeType.BufferSource:
                return this._graph.nodes.BufferSource[key.key];
            case NodeType.ChannelMerger:
                return this._graph.nodes.ChannelMerger[key.key];
            case NodeType.ChannelSplitter:
                return this._graph.nodes.ChannelSplitter[key.key];
            case NodeType.ConstantSource:
                return this._graph.nodes.ConstantSource[key.key];
            case NodeType.Convolver:
                return this._graph.nodes.Convolver[key.key];
            case NodeType.Delay:
                return this._graph.nodes.Delay[key.key];
            case NodeType.DynamicsCompressor:
                return this._graph.nodes.DynamicsCompressor[key.key];
            case NodeType.Gain:
                return this._graph.nodes.Gain[key.key];
            case NodeType.IIRFilter:
                return this._graph.nodes.IIRFilter[key.key];
            case NodeType.MediaElementSource:
                return this._graph.nodes.MediaElementSource[key.key];
            case NodeType.MediaStreamDestination:
                return this._graph.nodes.MediaStreamDestination[key.key];
            case NodeType.MediaStreamSource:
                return this._graph.nodes.MediaStreamSource[key.key];
            case NodeType.MediaStreamTrackSource:
                return this._graph.nodes.MediaStreamTrackSource[key.key];
            case NodeType.Oscillator:
                return this._graph.nodes.Oscillator[key.key];
            case NodeType.Panner:
                return this._graph.nodes.Panner[key.key];
            case NodeType.StereoPanner:
                return this._graph.nodes.StereoPanner[key.key];
            case NodeType.WaveShaper:
                return this._graph.nodes.WaveShaper[key.key];
            default:
                break;
        }
        throw new TypeError('NodeType is not a valid type');
    }) as INodeRetriever;

    setParameter = ((key: INode, param: ParamName, value: number | string, time: number = this._context.currentTime) => {
        const node = this.node(key as any) as any;
        if (typeof node[param] === 'string') {
            node[param] = value;
        } else {
            node[param].setValueAtTime(value, time);
        }
    }) as IParameterUpdater;

    get context(): Context {
        return this._context;
    }

    createMediaElementSource = (mediaElement: HTMLMediaElement): IMediaElementSource => {
        return this._createNode(NodeType.MediaElementSource, mediaElement) as IMediaElementSource;
    }

    createMediaStreamDestination = (): IMediaStreamDestination => {
        return this._createNode(NodeType.MediaStreamDestination) as IMediaStreamDestination;
    }

    createMediaStreamSource = (mediaStream: MediaStream): IMediaStreamSource => {
        return this._createNode(NodeType.MediaStreamSource, mediaStream) as IMediaStreamSource;
    }
    createMediaStreamTrackSource = (mediaStreamTrack: MediaStreamTrack): IMediaStreamTrackSource => {
        return this._createNode(NodeType.MediaStreamTrackSource, mediaStreamTrack) as IMediaStreamTrackSource;
    }
    get audioWorklet(): IAudioWorklet | undefined {
        return this._context.audioWorklet;
    }
    createAnalyser = (): IAnalyser => {
        return this._createNode(NodeType.Analyser) as IAnalyser;
    }
    createBiquadFilter = (): IBiquadFilter => {
        return this._createNode(NodeType.BiquadFilter) as IBiquadFilter;
    }
    createBuffer = (numberOfChannels: number, length: number, sampleRate: number): IAudioBuffer => {
        return this._context.createBuffer(numberOfChannels, length, sampleRate);
    }
    createBufferSource = (): IBufferSource => {
        return this._createNode(NodeType.BufferSource) as IBufferSource;
    }
    createChannelMerger = (numberOfInputs?: number): IChannelMerger => {
        return this._createNode(NodeType.ChannelMerger, numberOfInputs) as IChannelMerger;
    }
    createChannelSplitter = (numberOfOutputs?: number): IChannelSplitter => {
        return this._createNode(NodeType.ChannelSplitter, numberOfOutputs) as IChannelSplitter;
    }
    createConstantSource = (): IConstantSource => {
        return this._createNode(NodeType.ConstantSource) as IConstantSource;
    }
    createConvolver = (): IConvolver => {
        return this._createNode(NodeType.Convolver) as IConvolver;
    }
    createDelay = (maxDelayTime?: number): IDelay => {
        return this._createNode(NodeType.Delay, maxDelayTime) as IDelay;
    }
    createDynamicsCompressor = (): IDynamicsCompressor => {
        return this._createNode(NodeType.DynamicsCompressor) as IDynamicsCompressor;
    }
    createGain = (): IGain => {
        return this._createNode(NodeType.Gain) as IGain;
    }
    createIIRFilter = (feedforward: number[], feedback: number[]): IIIRFilter => {
        return this._createNode(NodeType.IIRFilter, feedforward, feedback) as IIIRFilter;
    }
    createOscillator = (): IOscillator => {
        return this._createNode(NodeType.Oscillator) as IOscillator;
    }
    createPanner = (): IPanner => {
        return this._createNode(NodeType.Panner) as IPanner;
    }
    createPeriodicWave = (real: number[], imag: number[], constraints?: Partial<IPeriodicWaveConstraints>): IPeriodicWave => {
        return this._context.createPeriodicWave(real, imag, constraints);
    }
    createStereoPanner = (): IStereoPanner => {
        return this._createNode(NodeType.StereoPanner) as IStereoPanner;
    }
    createWaveShaper = (): IWaveShaper => {
        return this._createNode(NodeType.WaveShaper) as IWaveShaper;
    }
    decodeAudioData = (audioData: ArrayBuffer, successCallback?: TDecodeSuccessCallback, errorCallback?: TDecodeErrorCallback): Promise<AudioBuffer> => {
        return this._context.decodeAudioData(audioData, successCallback, errorCallback);
    }
}




export {
    nativeAttributes,
    automateableParams,
    enumParams,
    nativeParams,
    options,
    IConnection,
    IAnalyser,
    IBiquadFilter,
    IBufferSource,
    IChannelMerger,
    IChannelSplitter,
    IConstantSource,
    IConvolver,
    IDelay,
    IDynamicsCompressor,
    IGain,
    IIIRFilter,
    IMediaElementSource,
    IMediaStreamDestination,
    IMediaStreamSource,
    IMediaStreamTrackSource,
    INode,
    IOscillator,
    IPanner,
    IStereoPanner,
    IWaveShaper,
    IOptions,
    IAutomateableParams,
    IEnumParams,
    IParams,
    ISerializedGraph,
    ISerializedNode,
    ISerializedOption,
    NodeType,
    OptionName,
    AutomateableBiquadFilterParam,
    AutomateableBufferSourceParam,
    AutomateableConstantSourceParam,
    AutomateableDelayParam,
    AutomateableDynamicsCompressorParam,
    AutomateableGainParam,
    AutomateableOscillatorParam,
    AutomateablePannerParam,
    AutomateableParamName,
    AutomateableStereoPannerParam,
    EnumBiquadFilterParam,
    EnumOscillatorParam,
    EnumPannerParam,
    EnumParamName,
    EnumWaveShaperParam,
    ParamName
};
