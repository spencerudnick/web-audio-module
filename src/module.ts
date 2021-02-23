import { ISerializedNode, NodeType,  } from "audio-om";


export interface IParameter {
  id: string;
  key: string;
  value: string | number;
}

export interface IConnection {
  id: string;
  source: string;
  destination: string;
}

export interface INumberParameter {
  id: string;
  min: number;
  max: number;
}

export interface IStringParameter {
  id: string;
  valuesEnum: string[];
}

export type IPublicParameter = INumberParameter | IStringParameter;

export interface IModule {
  id: string;
  nodes: ISerializedNode[];
  submodules: string[];
  connections: IConnection[];
  exposedParameters: IPublicParameter[];
  inPorts: string[];
  outPorts: string[];
}

const mod0: IModule = {
  id: 'id0',
  nodes: [
    {
      key: 'id1', type: NodeType.Gain, options: [
        {
          key: 'id2', name: 'gain', value: 3
        }
      ]
    },
    {
      key: 'id3', type: NodeType.Oscillator, options: [
        {
          key: 'id4', name: 'frequency', value: 0.2
        },
        { 
          key: 'id5', name: 'type', value: 'sawtooth'
        }
      ]
    },
    {
      key: 'id6', type: NodeType.Oscillator, options: [
        {
          key: 'id7', name: 'frequency', value: 200
        },
        { 
          key: 'id8', name: 'type', value: 'square'
        }
      ]
    },

  ],
  submodules: [
    'id0'
  ],
  connections: [
    {
      id: 'id9', source: 'id3', destination: 'id1'
    },
    {
      id: 'id10', source: 'id3', destination: 'id2'
    },
    {
      id: 'id11', source: 'id1', destination: 'id7'
    },
  ],
  exposedParameters: [
    {
      id:'id4',
      min: 0,
      max: 40
    },
    {
      id:'id5',
      valuesEnum: [
        'sawtooth',
        'sine',
        'square',
        'triangle'
      ]
    }
  ],
  inPorts: [
    'id4'
  ],
  outPorts: [
    'id6'
  ]
}

const mod1: IModule = {
  id: 'id12',
  nodes: [
    {
      key: 'id13', type: NodeType.Gain, options: [
        {
          key: 'id14', name: 'gain', value: 10
        }
      ]
    },
    {
      key: 'id15', type: NodeType.Oscillator, options: [
        {
          key: 'id16', name: 'frequency', value: 0.5
        },
        { 
          key: 'id17', name: 'type', value: 'sine'
        }
      ]
    }
  ],
  submodules: [
    ...[] // ????????????????????????????????
  ]
}