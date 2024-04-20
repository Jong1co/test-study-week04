import { BusanRule } from "./BusanRule";
import { ClapCounter, ClapCounterImpl } from "./ClapCounter";
import { Player, PlayerImpl } from "./Player";
import { SeoulRule } from "./SeoulRule";

export interface ThreeSixNineGame {
  do369: (number: number) => string;
  playGame: (players: Player[], clapCounter?: ClapCounter) => void;
}

export class ThreeSixNineGameImpl implements ThreeSixNineGame {
  rule: ThreeSixNineGame;

  constructor(rule: ThreeSixNineGame) {
    this.rule = rule;
  }

  do369(number: number) {
    return this.rule.do369(number);
  }

  async playGame(players: Player[], clapCounter?: ClapCounter | undefined) {
    try {
      await this.rule.playGame(players, clapCounter);
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

const players = [
  { name: "짱구", incorrectAnswerRate: 0.2 }, //
  { name: "훈이", incorrectAnswerRate: 0.3 },
  { name: "맹구", incorrectAnswerRate: 0.25 },
  { name: "유리", incorrectAnswerRate: 0.1 },
].map((variable) => new PlayerImpl(variable));

const clapCounter = new ClapCounterImpl();
const seoulRule = new SeoulRule();
const busanRule = new BusanRule();

const seoulGame = new ThreeSixNineGameImpl(seoulRule);
const busanGame = new ThreeSixNineGameImpl(busanRule);

const gameList = [seoulGame, busanGame];

(async () => {
  await Promise.all(
    gameList.map((game) => game.playGame(players, clapCounter))
  ).finally(() => clapCounter.printClapCount());
})();
