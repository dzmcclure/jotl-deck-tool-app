import {CardChanges} from "../../models/perk";

export const VoidwardenPerks: Record<string, CardChanges> = {
  'vw-01': {
    addCards: [],
    removeCards: ['jl-am-m-12', 'jl-am-m-13'],
  },
  'vw-02': {
    addCards: [],
    removeCards: ['jl-am-m-17'],
  },
  'vw-03': {
    addCards: [{
      id: "jl-am-vw-01",
      description: "+1 - Infuse Dark",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/VW/jl-am-vw-01.png",
    }],
    removeCards: ['jl-am-m-01'],
  },
  'vw-04': {
    addCards: [{
      id: "jl-am-vw-02",
      description: "+1 - Infuse Dark",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/VW/jl-am-vw-02.png",
    }],
    removeCards: ['jl-am-m-02'],
  },
  'vw-05': {
    addCards: [{
      id: "jl-am-vw-03",
      description: "+1 - Infuse Frost",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/VW/jl-am-vw-03.png",
    }],
    removeCards: ['jl-am-m-03'],
  },
  'vw-06': {
    addCards: [{
      id: "jl-am-vw-04",
      description: "+1 - Infuse Frost",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/VW/jl-am-vw-04.png",
    }],
    removeCards: ['jl-am-m-04'],
  },
  'vw-07': {
    addCards: [{
      id: "jl-am-vw-05",
      description: "+0 - Heal 1 (Ally)",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/VW/jl-am-vw-05.png",
    }],
    removeCards: ['jl-am-m-14'],
  },
  'vw-08': {
    addCards: [{
      id: "jl-am-vw-06",
      description: "+0 - Heal 1 (Ally)",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/VW/jl-am-vw-06.png",
    }],
    removeCards: ['jl-am-m-15'],
  },
  'vw-09': {
    addCards: [{
      id: "jl-am-vw-07",
      description: "+1 - Heal 1 (Ally)",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/VW/jl-am-vw-07.png",
    }],
    removeCards: [],
  },
  'vw-10': {
    addCards: [{
      id: "jl-am-vw-08",
      description: "+1 - Heal 1 (Ally)",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/VW/jl-am-vw-08.png",
    }],
    removeCards: [],
  },
  'vw-11': {
    addCards: [{
      id: "jl-am-vw-09",
      description: "+1 - Heal 1 (Ally)",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/VW/jl-am-vw-09.png",
    }],
    removeCards: [],
  },
  'vw-12': {
    addCards: [{
      id: "jl-am-vw-10",
      description: "+1 - Inflict Poison",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/VW/jl-am-vw-10.png",
    }],
    removeCards: [],
  },
  'vw-13': {
    addCards: [{
      id: "jl-am-vw-11",
      description: "+3",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/VW/jl-am-vw-11.png",
    }],
    removeCards: [],
  },
  'vw-14': {
    addCards: [{
      id: "jl-am-vw-12",
      description: "+1 - Curse Target",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/VW/jl-am-vw-12.png",
    }],
    removeCards: [],
  },
  'vw-15': {
    addCards: [{
      id: "jl-am-vw-13",
      description: "+1 - Curse Target",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/VW/jl-am-vw-13.png",
    }],
    removeCards: [],
  },
}
