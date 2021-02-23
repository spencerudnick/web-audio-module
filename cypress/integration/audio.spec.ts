import { AudioContext as StandardizedAudioContext, AnalyserNode, BiquadFilterNode, AudioBufferSourceNode, ChannelMergerNode, ChannelSplitterNode, ConstantSourceNode, ConvolverNode, DelayNode, DynamicsCompressorNode, GainNode, IIRFilterNode, OscillatorNode, PannerNode, StereoPannerNode, WaveShaperNode, OfflineAudioContext as StandardizedOfflineAudioContext } from 'standardized-audio-context';
import Audio, { attributesFor, paramsFor } from '../../src/audio';
import { NodeType } from '../../src/audio/types/node';

context('Nodes', () => {
  describe('Graph Store Class', () => {
    it('.should() - initialize a graph store', () => {
      const audio = new Audio();
      expect(!!audio).to.be.true;
    });

    it('.should() - accept a standardized AudioContext', () => {
      const context = new StandardizedAudioContext();
      const audio = new Audio(context);
      expect(audio.context).to.equal(context);
    });

    it('.should() - accept a standardized OfflineAudioContext', () => {
      const context = new StandardizedOfflineAudioContext({
        length: 1,
        sampleRate: 44100
      });
      const audio = new Audio(context);
      expect(audio.context).to.equal(context);
    });

    it('.should() - accept a native AudioContext', () => {
      const context = new AudioContext();
      const audio = new Audio(context as any);
      expect(audio.context).to.equal(context);
    });

    it('.should() - accept a native OfflineAudioContext', () => {
      const context = new OfflineAudioContext({
        length: 1,
        sampleRate: 44100
      });
      const audio = new Audio(context as any);
      expect(audio.context).to.equal(context);
    });
  });

  describe('Node Factories', () => {
    const audio = new Audio();

    it('.should() - create an AnalyserNode', () => {
      const analyser = audio.createAnalyser();
      expect(audio.node(analyser) instanceof AnalyserNode).to.be.true;
      expect(analyser.type).to.equal(NodeType.Analyser);
    });

    it('.should() - create a BiquadFilterNode', () => {
      const biquadFilter = audio.createBiquadFilter();
      expect(audio.node(biquadFilter) instanceof BiquadFilterNode).to.be.true;
      expect(biquadFilter.type).to.equal(NodeType.BiquadFilter);
    });

    it('.should() - create a BufferSource', () => {
      const bufferSource = audio.createBufferSource();
      expect(audio.node(bufferSource) instanceof AudioBufferSourceNode).to.be.true;
      expect(bufferSource.type).to.equal(NodeType.BufferSource);
    });

    it('.should() - create a ChannelMerger', () => {
      const channelMerger = audio.createChannelMerger();
      expect(audio.node(channelMerger) instanceof ChannelMergerNode).to.be.true;
      expect(channelMerger.type).to.equal(NodeType.ChannelMerger);
    });

    it('.should() - create a ChannelSplitter', () => {
      const channelSplitter = audio.createChannelSplitter();
      expect(audio.node(channelSplitter) instanceof ChannelSplitterNode).to.be.true;
      expect(channelSplitter.type).to.equal(NodeType.ChannelSplitter);
    });

    it('.should() - create a ConstantSource', () => {
      const constantSource = audio.createConstantSource();
      expect(audio.node(constantSource) instanceof ConstantSourceNode).to.be.true;
      expect(constantSource.type).to.equal(NodeType.ConstantSource);
    });

    it('.should() - create a Convolver', () => {
      const convolver = audio.createConvolver();
      expect(audio.node(convolver) instanceof ConvolverNode).to.be.true;
      expect(convolver.type).to.equal(NodeType.Convolver);
    });

    it('.should() - create a Delay', () => {
      const delay = audio.createDelay();
      expect(audio.node(delay) instanceof DelayNode).to.be.true;
      expect(delay.type).to.equal(NodeType.Delay);
    });

    it('.should() - create a DynamicsCompressor', () => {
      const dynamicsCompressor = audio.createDynamicsCompressor();
      expect(audio.node(dynamicsCompressor) instanceof DynamicsCompressorNode).to.be.true;
      expect(dynamicsCompressor.type).to.equal(NodeType.DynamicsCompressor);
    });

    it('.should() - create a Gain', () => {
      const gain = audio.createGain();
      expect(audio.node(gain) instanceof GainNode).to.be.true;
      expect(gain.type).to.equal(NodeType.Gain);
    });

    it('.should() - create an IIRFilter', () => {
      const iIRFilter = audio.createIIRFilter([1], [1]);
      expect(audio.node(iIRFilter) instanceof IIRFilterNode).to.be.true;
      expect(iIRFilter.type).to.equal(NodeType.IIRFilter);
    });

    it('.should() - create an Oscillator', () => {
      const oscillator = audio.createOscillator();
      expect(audio.node(oscillator) instanceof OscillatorNode).to.be.true;
      expect(audio.node(oscillator).frequency.value).to.equal(440);
      expect(oscillator.type).to.equal(NodeType.Oscillator);
    });

    it('.should() - create a Panner', () => {
      const panner = audio.createPanner();
      expect(audio.node(panner) instanceof PannerNode).to.be.true;
      expect(panner.type).to.equal(NodeType.Panner);
    });

    it('.should() - create a StereoPanner', () => {
      const stereoPanner = audio.createStereoPanner();
      expect(audio.node(stereoPanner) instanceof StereoPannerNode).to.be.true;
      expect(stereoPanner.type).to.equal(NodeType.StereoPanner);
    });

    it('.should() - create a WaveShaper', () => {
      const waveShaper = audio.createWaveShaper();
      expect(audio.node(waveShaper) instanceof WaveShaperNode).to.be.true;
      expect(waveShaper.type).to.equal(NodeType.WaveShaper);
    });
  });

  describe('Node Parameters', () => {
    describe('AnalyserNode', () => {
      const analyserParams = paramsFor(NodeType.Analyser)

      it('.should() - have no parameters', () => {
        expect(analyserParams).to.be.empty;
      });
    });

    describe('BiquadFilterNode', () => {
      const biquadFilterParams = paramsFor(NodeType.BiquadFilter)

      it('.should() - have a `frequency` parameter', () => {
        expect(biquadFilterParams).to.include('frequency');
      });

      it('.should() - have a `detune` parameter', () => {
        expect(biquadFilterParams).to.include('detune');
      });

      it('.should() - have a `Q` parameter', () => {
        expect(biquadFilterParams).to.include('Q');
      });

      it('.should() - have a `type` parameter', () => {
        expect(biquadFilterParams).to.include('type');
      });
    });

    describe('BufferSourceNode', () => {
      const bufferSourceParams = paramsFor(NodeType.BufferSource)

      it('.should() - have no parameters', () => {
        expect(bufferSourceParams).to.be.empty;
      });
    });

    describe('ConstantSourceNode', () => {
      const constantSourceParams = paramsFor(NodeType.ConstantSource)

      it('.should() - have an `offset` parameter', () => {
        expect(constantSourceParams).to.include('offset');
      });
    });

    describe('DelayNode', () => {
      const delayParams = paramsFor(NodeType.Delay)

      it('.should() - have a `delayTime` parameter', () => {
        expect(delayParams).to.include('delayTime');
      });
    });

    describe('DynamicsCompressorNode', () => {
      const dynamicsCompressorParams = paramsFor(NodeType.DynamicsCompressor)

      it('.should() - have an `attack` parameter', () => {
        expect(dynamicsCompressorParams).to.include('attack');
      });

      it('.should() - have a `knee` parameter', () => {
        expect(dynamicsCompressorParams).to.include('knee');
      });

      it('.should() - have a `ratio` parameter', () => {
        expect(dynamicsCompressorParams).to.include('ratio');
      });

      it('.should() - have a `release` parameter', () => {
        expect(dynamicsCompressorParams).to.include('release');
      });

      it('.should() - have a `threshold` parameter', () => {
        expect(dynamicsCompressorParams).to.include('threshold');
      });
    });

    describe('GainNode', () => {
      const gainParams = paramsFor(NodeType.Gain)

      it('.should() - have a `gain` parameter', () => {
        expect(gainParams).to.include('gain');
      });
    });

    describe('OscillatorNode', () => {
      const oscillatorParams = paramsFor(NodeType.Oscillator)

      it('.should() - have a `detune` parameter', () => {
        expect(oscillatorParams).to.include('detune');
      });

      it('.should() - have a `frequency` parameter', () => {
        expect(oscillatorParams).to.include('frequency');
      });

      it('.should() - have a `type` parameter', () => {
        expect(oscillatorParams).to.include('type');
      });
    });

    describe('PannerNode', () => {
      const pannerParams = paramsFor(NodeType.Panner)

      it('.should() - have a `distanceModel` parameter', () => {
        expect(pannerParams).to.include('distanceModel');
      });

      it('.should() - have an `orientationX` parameter', () => {
        expect(pannerParams).to.include('orientationX');
      });

      it('.should() - have an `orientationY` parameter', () => {
        expect(pannerParams).to.include('orientationY');
      });

      it('.should() - have an `orientationZ` parameter', () => {
        expect(pannerParams).to.include('orientationZ');
      });

      it('.should() - have a `panningModel` parameter', () => {
        expect(pannerParams).to.include('panningModel');
      });

      it('.should() - have a `positionX` parameter', () => {
        expect(pannerParams).to.include('positionX');
      });

      it('.should() - have a `positionY` parameter', () => {
        expect(pannerParams).to.include('positionY');
      });

      it('.should() - have a `positionZ` parameter', () => {
        expect(pannerParams).to.include('positionZ');
      });
    });

    describe('StereoPannerNode', () => {
      const stereoPannerParams = paramsFor(NodeType.StereoPanner)

      it('.should() - have a `pan` parameter', () => {
        expect(stereoPannerParams).to.include('pan');
      });
    });

    describe('WaveShaperNode', () => {
      const waveShaperParams = paramsFor(NodeType.WaveShaper);

      it('.should() - have a `oversample` parameter', () => {
        expect(waveShaperParams).to.include('oversample');
      });
    });
  });

  describe('Node Attributes', () => {
    describe('AnalyserNode', () => {
      const analyserAttributes = attributesFor(NodeType.Analyser);

      it('.should() - have a `fftSize` attribute', () => {
        expect(analyserAttributes).to.include('fftSize');
        expect(analyserAttributes).to.include('fftSize');
      });

      it('.should() - have a `frequencyBinCount` attribute', () => {
        expect(analyserAttributes).to.include('frequencyBinCount');
      });

      it('.should() - have a `maxDecibels` attribute', () => {
        expect(analyserAttributes).to.include('maxDecibels');
      });

      it('.should() - have a `minDecibels` attribute', () => {
        expect(analyserAttributes).to.include('minDecibels');
      });

      it('.should() - have a `smoothingTimeConstant` attribute', () => {
        expect(analyserAttributes).to.include('smoothingTimeConstant');
      });
    });

    describe('BiquadFilterNode', () => {
      const biquadFilterAttributes = attributesFor(NodeType.BiquadFilter);

      it('.should() - have no attributes', () => {
        expect(biquadFilterAttributes).to.be.empty;
      });
    });

    describe('BufferSourceNode', () => {
      const bufferSourceAttributes = attributesFor(NodeType.BufferSource)

      it('.should() - have a `buffer` attribute', () => {
        expect(bufferSourceAttributes).to.include('buffer');
      });

      it('.should() - have a `loop` attribute', () => {
        expect(bufferSourceAttributes).to.include('loop');
      });

      it('.should() - have a `loopEnd` attribute', () => {
        expect(bufferSourceAttributes).to.include('loopEnd');
      });

      it('.should() - have a `loopStart` attribute', () => {
        expect(bufferSourceAttributes).to.include('loopStart');
      });

      it('.should() - have a `playbackRate` attribute', () => {
        expect(bufferSourceAttributes).to.include('playbackRate');
      });
    });

    describe('ChannelMergerNode', () => {
      const channelMergerAttributes = attributesFor(NodeType.ChannelMerger);

      it('.should() - have no attributes', () => {
        expect(channelMergerAttributes).to.be.empty;
      });
    });

    describe('ChannelSplitterNode', () => {
      const channelSplitterAttributes = attributesFor(NodeType.ChannelSplitter);

      it('.should() - have no attributes', () => {
        expect(channelSplitterAttributes).to.be.empty;
      });
    });

    describe('ConstantSourceNode', () => {
      const constantSourceAttributes = attributesFor(NodeType.ConstantSource);

      it('.should() - have no attributes', () => {
        expect(constantSourceAttributes).to.be.empty;
      });
    });

    describe('ConvolverNode', () => {
      const convolverAttributes = attributesFor(NodeType.Convolver);

      it('.should() - have a `buffer` attribute', () => {
        expect(convolverAttributes).to.include('buffer');
      });

      it('.should() - have a `normalize` attribute', () => {
        expect(convolverAttributes).to.include('normalize');
      });
    });

    describe('DelayNode', () => {
      const delayAttributes = attributesFor(NodeType.Delay);

      it('.should() - have no attributes', () => {
        expect(delayAttributes).to.be.empty;
      });
    });

    describe('DynamicsCompressorNode', () => {
      const dynamicsCompressorAttributes = attributesFor(NodeType.DynamicsCompressor);

      it('.should() - have no attributes', () => {
        expect(dynamicsCompressorAttributes).to.be.empty;
      });
    });

    describe('GainNode', () => {
      const gainAttributes = attributesFor(NodeType.Gain);

      it('.should() - have no attributes', () => {
        expect(gainAttributes).to.be.empty;
      });
    });

    describe('IIRFilterNode', () => {
      const iIRFilterAttributes = attributesFor(NodeType.IIRFilter);

      it('.should() - have no attributes', () => {
        expect(iIRFilterAttributes).to.be.empty;
      });
    });

    describe('OscillatorNode', () => {
      const oscillatorAttributes = attributesFor(NodeType.Oscillator);

      it('.should() - have no attributes', () => {
        expect(oscillatorAttributes).to.be.empty;
      });
    });

    describe('PannerNode', () => {
      const pannerAttributes = attributesFor(NodeType.Panner);

      it('.should() - have a `coneInnerAngle` attribute', () => {
        expect(pannerAttributes).to.include('coneInnerAngle');
      });

      it('.should() - have a `coneOuterAngle` attribute', () => {
        expect(pannerAttributes).to.include('coneOuterAngle');
      });

      it('.should() - have a `coneOuterGain` attribute', () => {
        expect(pannerAttributes).to.include('coneOuterGain');
      });

      it('.should() - have a `maxDistance` attribute', () => {
        expect(pannerAttributes).to.include('maxDistance');
      });
    });

    describe('StereoPannerNode', () => {
      const stereoPannerAttributes = attributesFor(NodeType.StereoPanner);

      it('.should() - have no attributes', () => {
        expect(stereoPannerAttributes).to.be.empty;
      });
    });

    describe('WaveShaperNode', () => {
      const waveShaperAttributes = attributesFor(NodeType.WaveShaper);

      it('.should() - have a `curve` attribute', () => {
        expect(waveShaperAttributes).to.include('curve');
      });
    });
  });
});
