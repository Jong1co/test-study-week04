import { ThreeSixNineGame, ThreeSixNineGameImpl } from "./TreeSixNineGame";
import { Player } from "./Player";
import { ClapCounter } from "./ClapCounter";

export class SeoulRule implements ThreeSixNineGame {
  do369(number: number): string {
    for (let num of String(number)) {
      if (Number(num) % 3 === 0) return "clap";
    }

    return `${number}`;
  }

  playGame(players: Player[], clapCounter?: ClapCounter) {
    const playerLength = players.length;

    let index = 0;

    // test를 위해서 100으로 제한해둠
    // test가 영향을 안 받게 하기 위해서는 mocking을 해줘야 할 것 같음
    while (index < 100) {
      const number = index + 1;
      const answer = this.do369(number);

      const player = players[index % playerLength];
      const isIncorrectAnswer = this.isTurnOfIncorrectAnswer(player);

      if (isIncorrectAnswer) {
        const incorrectAnswer = this.getIncorrectAnswer(number);
        console.log(`서울- ${player.name}: ${incorrectAnswer}`);
        console.log("틀렸습니다! 게임을 종료합니다.");

        return;
      }

      const clapCount = answer.match(/clap/g)?.length || 0;

      clapCounter?.addClapCount(clapCount);

      console.log(`서울 - ${player.name}: ${answer}`);
      index++;
    }
  }

  private isTurnOfIncorrectAnswer(player: Player) {
    const random = Math.random();
    return player.incorrectAnswerRate > random;
  }

  private getIncorrectAnswer(number: number) {
    return number - 1;
  }
}
