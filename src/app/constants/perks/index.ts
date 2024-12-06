import { DemolitionistPerks } from "./demolitionist-perks";
import { HatchetPerks } from "./hatchet-perks";
import { RedguardPerks } from "./redguard-perks";
import { VoidwardenPerks } from "./voidwarden-perks";
export { DemolitionistPerks } from "./demolitionist-perks";
export { HatchetPerks } from "./hatchet-perks";
export { RedguardPerks } from "./redguard-perks";
export { VoidwardenPerks } from "./voidwarden-perks";

export const PERKS = {
  ...DemolitionistPerks,
  ...HatchetPerks,
  ...RedguardPerks,
  ...VoidwardenPerks,
};
