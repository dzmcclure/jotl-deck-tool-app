import {CardChanges} from "../../models/perk";

export const HatchetPerks: Record<string, CardChanges> = {
  'ha-01': {
    addCards: [],
    removeCards: ['jl-am-m-12', 'jl-am-m-13'],
  },
  'ha-02': {
    addCards: [],
    removeCards: ['jl-am-m-14', 'jl-am-m-15'],
  },
  'ha-03': {
    addCards: [{
      id: "jl-am-ha-01",
      description: "+2 - Inflict Muddle",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-01.png",
    }],
    removeCards: ['jl-am-m-01'],
  },
  'ha-04': {
    addCards: [{
      id: "jl-am-ha-02",
      description: "+1 - Inflict Poison",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-02.png",
    }],
    removeCards: ['jl-am-m-02'],
  },
  'ha-05': {
    addCards: [{
      id: "jl-am-ha-03",
      description: "+1 - Inflict Wound",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-03.png",
    }],
    removeCards: ['jl-am-m-03'],
  },
  'ha-06': {
    addCards: [{
      id: "jl-am-ha-04",
      description: "+1 - Inflict Immobilize",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-04.png",
    }],
    removeCards: ['jl-am-m-04'],
  },
  'ha-07': {
    addCards: [{
      id: "jl-am-ha-05",
      description: "+1 - Push 2",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-05.png",
    }],
    removeCards: ['jl-am-m-05'],
  },
  'ha-08': {
    addCards: [{
      id: "jl-am-ha-06",
      description: "+0 - Inflict Stun",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-06.png",
    }],
    removeCards: ['jl-am-m-06'],
  },
  'ha-09': {
    addCards: [{
      id: "jl-am-ha-07",
      description: "+1 - Inflict Stun",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-07.png",
    }],
    removeCards: ['jl-am-m-07'],
  },
  'ha-10': {
    addCards: [{
      id: "jl-am-ha-08",
      description: "+2 - Infuse Air",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-08.png",
    }],
    removeCards: [],
  },
  'ha-11': {
    addCards: [{
      id: "jl-am-ha-09",
      description: "+2 - Infuse Air",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-09.png",
    }],
    removeCards: [],
  },
  'ha-12': {
    addCards: [{
      id: "jl-am-ha-10",
      description: "+2 - Infuse Air",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-10.png",
    }],
    removeCards: [],
  },
  'ha-13': {
    addCards: [{
      id: "jl-am-ha-11",
      description: "+3",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-11.png",
    }],
    removeCards: ['jl-am-m-08'],
  },
  'ha-14': {
    addCards: [{
      id: "jl-am-ha-12",
      description: "+3",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-12.png",
    }],
    removeCards: ['jl-am-m-09'],
  },
  'ha-15': {
    addCards: [{
      id: "jl-am-ha-13",
      description: "+3",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-13.png",
    }],
    removeCards: ['jl-am-m-10'],
  },
}
