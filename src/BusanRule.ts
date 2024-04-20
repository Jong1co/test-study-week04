import { ThreeSixNineGame, ThreeSixNineGameImpl } from ".";
import { Player } from "./Player";

export class BusanRule extends ThreeSixNineGameImpl {
  constructor() {
    super();
  }

  do369(number: number): string {
    let clapCount = 0;

    for (let num of String(number)) {
      if (Number(num) % 3 === 0) clapCount++;
    }

    return clapCount > 0 ? "clap".repeat(clapCount) : `${number}`;
  }
}
