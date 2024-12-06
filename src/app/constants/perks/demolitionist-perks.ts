import {CardChanges} from "../../models/perk";

export const DemolitionistPerks: Record<string, CardChanges> = {
  'de-01': {
    addCards: [],
    removeCards: ['jl-am-m-01', 'jl-am-m-02', 'jl-am-m-03', 'jl-am-m-04'],
  },
  'de-02': {
    addCards: [],
    removeCards: ['jl-am-m-12', 'jl-am-m-13'],
  },
  'de-03': {
    addCards: [],
    removeCards: ['jl-am-m-14', 'jl-am-m-15'],
  },
  'de-04': {
    addCards: [],
    removeCards: ['jl-am-m-17', 'jl-am-m-07'],
  },
  'de-05': {
    addCards: [{
      id: "jl-am-de-01",
      description: "+2 - Inflict Muddle",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/DE/jl-am-de-01.png",
    }],
    removeCards: ['jl-am-m-05'],
  },
  'de-06': {
    addCards: [{
      id: "jl-am-de-02",
      description: "+2 - Inflict Muddle",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/DE/jl-am-de-02.png",
    }],
    removeCards: ['jl-am-m-06'],
  },
  'de-07': {
    addCards: [{
      id: "jl-am-de-03",
      description: "+0 - Inflict Poison",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/DE/jl-am-de-03.png",
    }],
    removeCards: ['jl-am-m-16'],
  },
  'de-08': {
    addCards: [{
      id: "jl-am-de-04",
      description: "+2",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/DE/jl-am-de-04.png",
    }],
    removeCards: [],
  },
  'de-09': {
    addCards: [{
      id: "jl-am-de-05",
      description: "+2",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/DE/jl-am-de-05.png",
    }],
    removeCards: [],
  },
  'de-10': {
    addCards: [{
      id: "jl-am-de-06",
      description: "+2 - Infuse Nature",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/DE/jl-am-de-06.png",
    }],
    removeCards: ['jl-am-m-08'],
  },
  'de-11': {
    addCards: [{
      id: "jl-am-de-07",
      description: "+2 - Infuse Nature",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/DE/jl-am-de-07.png",
    }],
    removeCards: ['jl-am-m-09'],
  },
  'de-12': {
    addCards: [{
      id: "jl-am-de-08",
      description: "+2 - Infuse Fire",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/DE/jl-am-de-08.png",
    }],
    removeCards: ['jl-am-m-10'],
  },
  'de-13': {
    addCards: [{
      id: "jl-am-de-09",
      description: "+2 - Infuse Fire",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/DE/jl-am-de-09.png",
    }],
    removeCards: ['jl-am-m-11'],
  },
  'de-14': {
    addCards: [{
      id: "jl-am-de-10",
      description: "+0 - All adjacent enemies suffer 1 damage",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/DE/jl-am-de-10.png",
    }],
    removeCards: [],
  },
  'de-15': {
    addCards: [{
      id: "jl-am-de-11",
      description: "+0 - All adjacent enemies suffer 1 damage",
      image: "assets/images/attack-modifiers/jaws-of-the-lion/DE/jl-am-de-11.png",
    }],
    removeCards: [],
  },
}