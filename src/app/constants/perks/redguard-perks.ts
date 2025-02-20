import {CardChanges} from "../../models/perk";

export const RedguardPerks: Record<string, CardChanges> = {
  'rg-01': {
    desc: 'Remove four +0',
    addCards: [],
    removeCards: ['jl-am-m-01', 'jl-am-m-02', 'jl-am-m-03', 'jl-am-m-04'],
  },
  'rg-02': {
    desc: 'Remove two -1',
    addCards: [],
    removeCards: ['jl-am-m-12', 'jl-am-m-13'],
  },
  'rg-03': {
    desc: 'Remove -2 +1',
    addCards: [],
    removeCards: ['jl-am-m-17', 'jl-am-m-07'],
  },
  'rg-04': {
    desc: 'Replace -1 with +1',
    addCards: [{
      id: "jl-am-rg-01",
      description: "+1",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/RG/jl-am-rg-01.png",
    }],
    removeCards: ['jl-am-m-14'],
  },
  'rg-05': {
    desc: 'Replace -1 with +1',
    addCards: [{
      id: "jl-am-rg-02",
      description: "+1",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/RG/jl-am-rg-02.png",
    }],
    removeCards: ['jl-am-m-15'],
  },
  'rg-06': {
    desc: 'Replace -1 with +2 Fire',
    addCards: [{
      id: "jl-am-rg-03",
      description: "+2 - Infuse Fire",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/RG/jl-am-rg-03.png",
    }],
    removeCards: ['jl-am-m-08'],
  },
  'rg-07': {
    desc: 'Replace -1 with +2 Fire',
    addCards: [{
      id: "jl-am-rg-04",
      description: "+2 - Infuse Fire",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/RG/jl-am-rg-04.png",
    }],
    removeCards: ['jl-am-m-09'],
  },
  'rg-08': {
    desc: 'Replace -1 with +2 Light',
    addCards: [{
      id: "jl-am-rg-05",
      description: "+2 - Infuse Light",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/RG/jl-am-rg-05.png",
    }],
    removeCards: ['jl-am-m-10'],
  },
  'rg-09': {
    desc: 'Replace -1 with +2 Light',
    addCards: [{
      id: "jl-am-rg-06",
      description: "+2 - Infuse Light",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/RG/jl-am-rg-06.png",
    }],
    removeCards: ['jl-am-m-11'],
  },
  'rg-10': {
    desc: 'Add +1 Fire Light',
    addCards: [{
      id: "jl-am-rg-07",
      description: "+1 - Infuse Fire - Infuse Light",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/RG/jl-am-rg-07.png",
    }],
    removeCards: [],
  },
  'rg-11': {
    desc: 'Add +1 Fire Light',
    addCards: [{
      id: "jl-am-rg-08",
      description: "+1 - Infuse Fire - Infuse Light",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/RG/jl-am-rg-08.png",
    }],
    removeCards: [],
  },
  'rg-12': {
    desc: 'Add +1 Shield 1',
    addCards: [{
      id: "jl-am-rg-09",
      description: "+1 - Shield 1",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/RG/jl-am-rg-09.png",
    }],
    removeCards: [],
  },
  'rg-13': {
    desc: 'Add +1 Shield 1',
    addCards: [{
      id: "jl-am-rg-10",
      description: "+1 - Shield 1",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/RG/jl-am-rg-10.png",
    }],
    removeCards: [],
  },
  'rg-14': {
    desc: 'Replace +0 with +1 Immobilize',
    addCards: [{
      id: "jl-am-rg-11",
      description: "+1 - Inflict Immobilize",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/RG/jl-am-rg-11.png",
    }],
    removeCards: ['jl-am-m-05'],
  },
  'rg-15': {
    desc: 'Replace +0 with +1 Wound',
    addCards: [{
      id: "jl-am-rg-12",
      description: "+1 - Inflict Wound",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/RG/jl-am-rg-12.png",
    }],
    removeCards: ['jl-am-m-06'],
  },
}
