
export type AutomateableBiquadFilterParam = 'Q' | 'detune' | 'frequency' | 'gain';
export type AutomateableBufferSourceParam = 'detune' | 'playbackRate';
export type AutomateableConstantSourceParam = 'offset';
export type AutomateableDelayParam = 'delayTime';
export type AutomateableDynamicsCompressorParam = 'attack' | 'knee' | 'ratio' | 'release' | 'threshold';
export type AutomateableGainParam = 'gain';
export type AutomateableOscillatorParam = 'detune' | 'frequency';
export type AutomateablePannerParam = 'orientationX' | 'orientationY' | 'orientationZ' | 'positionX' | 'positionY' | 'positionZ';
export type AutomateableStereoPannerParam = 'pan';


export type AutomateableParamName = AutomateableBiquadFilterParam |
  AutomateableBufferSourceParam |
  AutomateableConstantSourceParam |
  AutomateableDelayParam |
  AutomateableDynamicsCompressorParam |
  AutomateableGainParam |
  AutomateableOscillatorParam |
  AutomateablePannerParam |
  AutomateableStereoPannerParam;


export type EnumBiquadFilterParam = 'type';
export type EnumOscillatorParam = 'type';
export type EnumPannerParam = 'distanceModel' | 'panningModel';
export type EnumWaveShaperParam = 'oversample';

export type EnumParamName = EnumBiquadFilterParam |
  EnumOscillatorParam |
  EnumPannerParam |
  EnumWaveShaperParam;

export type ParamName = AutomateableParamName | EnumParamName;
