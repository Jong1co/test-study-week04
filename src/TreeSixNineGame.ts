import { BusanRule } from "./BusanRule";
import { ClapCounter, ClapCounterImpl } from "./ClapCounter";
import { Player, PlayerImpl } from "./Player";
import { Rule } from "./Rule";
import { SeoulRule } from "./SeoulRule";
import { Util } from "./Util";

export interface ThreeSixNineGame {
  do369: (number: number) => string;
  playGame: (players: Player[], clapCounter?: ClapCounter) => Promise<void>;
  isTurnOfIncorrectAnswer: (plyaer: Player) => boolean;
}

export class ThreeSixNineGameImpl implements ThreeSixNineGame {
  rule: Rule;

  constructor(rule: Rule) {
    this.rule = rule;
  }

  do369(number: number) {
    return this.rule.do369(number);
  }

  async playGame(players: Player[], clapCounter?: ClapCounter) {
    // test를 위해서 100으로 제한해둠
    // test가 영향을 안 받게 하기 위해서는 mocking을 해줘야 할 것 같음

    try {
      for (let index = 0; index < Infinity; index++) {
        await this.print(index, players, clapCounter);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async print(index: number, players: Player[], clapCounter?: ClapCounter) {
    const playerLength = players.length;

    const number = index + 1;
    const answer = this.do369(number);

    const player = players[index % playerLength];
    const isIncorrectAnswer = this.isTurnOfIncorrectAnswer(player);

    if (isIncorrectAnswer) {
      const incorrectAnswer = this.getIncorrectAnswer(number);
      console.log(
        `${this.rule.getLocation()} - ${player.name}: ${incorrectAnswer}`
      );
      throw new Error("틀렸습니다! 게임을 종료합니다.");
    }

    const clapCount = answer.match(/clap/g)?.length || 0;

    clapCounter?.addClapCount(clapCount);

    console.log(`서울 - ${player.name}: ${answer}`);
  }

  isTurnOfIncorrectAnswer(player: Player) {
    const random = Util.random();
    return player.incorrectAnswerRate >= random;
  }

  private getIncorrectAnswer(number: number) {
    return number - 1;
  }
}

const players = [
  { name: "짱구", incorrectAnswerRate: 1 }, //
  { name: "훈이", incorrectAnswerRate: 0 },
  { name: "맹구", incorrectAnswerRate: 0 },
  { name: "유리", incorrectAnswerRate: 0.1 },
].map((variable) => new PlayerImpl(variable));

const clapCounter = new ClapCounterImpl();
const seoulRule = new SeoulRule();
const busanRule = new BusanRule();

const seoulGame = new ThreeSixNineGameImpl(seoulRule);
const busanGame = new ThreeSixNineGameImpl(busanRule);

const gameList = [busanGame];

(async () => {
  await Promise.all(
    gameList.map((game) => game.playGame(players, clapCounter))
  ).finally(() => clapCounter.printClapCount());
})();
