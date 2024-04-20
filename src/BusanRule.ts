import { ThreeSixNineGame, ThreeSixNineGameImpl } from ".";
import { ClapCounter } from "./ClapCounter";
import { Player } from "./Player";

export class BusanRule implements ThreeSixNineGame {
  do369(number: number): string {
    let clapCount = 0;

    for (let num of String(number)) {
      if (Number(num) % 3 === 0) clapCount++;
    }

    return clapCount > 0 ? "clap".repeat(clapCount) : `${number}`;
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
      console.log(`부산 - ${player.name}: ${incorrectAnswer}`);
      throw new Error("틀렸습니다! 게임을 종료합니다.");
    }

    const clapCount = answer.match(/clap/g)?.length || 0;

    clapCounter?.addClapCount(clapCount);

    console.log(`부산 - ${player.name}: ${answer}`);
  }

  private isTurnOfIncorrectAnswer(player: Player) {
    const random = Math.random();
    return player.incorrectAnswerRate > random;
  }

  private getIncorrectAnswer(number: number) {
    return number - 1;
  }
}
