import { Player, PlayerImpl } from "./Player";

export interface ThreeSixNineGame {
  do369: (number: number) => string;
  playGame: (players: Player[]) => void;
}

export class ThreeSixNineGameImpl implements ThreeSixNineGame {
  constructor() {
    const players = [
      { name: "짱구", incorrectAnswerRate: 0.2 }, //
      { name: "훈이", incorrectAnswerRate: 0.3 },
      { name: "맹구", incorrectAnswerRate: 0.25 },
      { name: "유리", incorrectAnswerRate: 0.1 },
    ].map((variable) => new PlayerImpl(variable));
    this.playGame(players);
  }

  do369(number: number) {
    for (let num of String(number)) {
      if (Number(num) % 3 === 0) return "clap";
    }

    return `${number}`;
  }

  playGame(players: Player[]) {
    const numberList = Array.from({ length: 100 }, (_, i) => i);
    const playerLength = players.length;

    for (let index of numberList) {
      const number = index + 1;
      const answer = this.do369(number);

      const player = players[index % playerLength].name;

      console.log(`${player}: ${answer}`);
    }
  }

  isIncorrectAnswer(number: number) {
    for (let num of String(number)) {
      if (Number(num) % 3 === 0) return "clap";
    }

    return `${number}`;
  }
}
