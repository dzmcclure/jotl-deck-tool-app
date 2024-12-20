import {CardChanges} from "../../models/perk";

export const HatchetPerks: Record<string, CardChanges> = {
  'ha-01': {
    desc: 'remove 2 -1',
    addCards: [],
    removeCards: ['jl-am-m-12', 'jl-am-m-13'],
  },
  'ha-02': {
    desc: 'remove 2 -1',
    addCards: [],
    removeCards: ['jl-am-m-14', 'jl-am-m-15'],
  },
  'ha-03': {
    desc: 'replace +0 with +2 Muddle',
    addCards: [{
      id: "jl-am-ha-01",
      description: "+2 - Inflict Muddle",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-01.png",
    }],
    removeCards: ['jl-am-m-01'],
  },
  'ha-04': {
    desc: 'replace +0 with +1 Poison',
    addCards: [{
      id: "jl-am-ha-02",
      description: "+1 - Inflict Poison",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-02.png",
    }],
    removeCards: ['jl-am-m-02'],
  },
  'ha-05': {
    desc: 'replace +0 with +1 Wound',
    addCards: [{
      id: "jl-am-ha-03",
      description: "+1 - Inflict Wound",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-03.png",
    }],
    removeCards: ['jl-am-m-03'],
  },
  'ha-06': {
    desc: 'replace +0 with +1 Immobilize',
    addCards: [{
      id: "jl-am-ha-04",
      description: "+1 - Inflict Immobilize",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-04.png",
    }],
    removeCards: ['jl-am-m-04'],
  },
  'ha-07': {
    desc: 'replace +0 with +1 Push 2',
    addCards: [{
      id: "jl-am-ha-05",
      description: "+1 - Push 2",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-05.png",
    }],
    removeCards: ['jl-am-m-05'],
  },
  'ha-08': {
    desc: 'replace +0 with +0 Stun',
    addCards: [{
      id: "jl-am-ha-06",
      description: "+0 - Inflict Stun",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-06.png",
    }],
    removeCards: ['jl-am-m-06'],
  },
  'ha-09': {
    desc: 'replace +1 with +1 Stun',
    addCards: [{
      id: "jl-am-ha-07",
      description: "+1 - Inflict Stun",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-07.png",
    }],
    removeCards: ['jl-am-m-07'],
  },
  'ha-10': {
    desc: 'add +2 Air',
    addCards: [{
      id: "jl-am-ha-08",
      description: "+2 - Infuse Air",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-08.png",
    }],
    removeCards: [],
  },
  'ha-11': {
    desc: 'add +2 Air',
    addCards: [{
      id: "jl-am-ha-09",
      description: "+2 - Infuse Air",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-09.png",
    }],
    removeCards: [],
  },
  'ha-12': {
    desc: 'add +2 Air',
    addCards: [{
      id: "jl-am-ha-10",
      description: "+2 - Infuse Air",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-10.png",
    }],
    removeCards: [],
  },
  'ha-13': {
    desc: 'replace +1 with +3',
    addCards: [{
      id: "jl-am-ha-11",
      description: "+3",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-11.png",
    }],
    removeCards: ['jl-am-m-08'],
  },
  'ha-14': {
    desc: 'replace +1 with +3',
    addCards: [{
      id: "jl-am-ha-12",
      description: "+3",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-12.png",
    }],
    removeCards: ['jl-am-m-09'],
  },
  'ha-15': {
    desc: 'replace +1 with +3',
    addCards: [{
      id: "jl-am-ha-13",
      description: "+3",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/HA/jl-am-ha-13.png",
    }],
    removeCards: ['jl-am-m-10'],
  },
}
