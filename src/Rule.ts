import { ThreeSixNineGame } from "./TreeSixNineGame";

export interface Rule extends Pick<ThreeSixNineGame, "do369"> {
  getLocation: () => string;
}
