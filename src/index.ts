export interface ThreeSixNineGame {
  do369: (number: number) => string;
  playGame: (players: string[]) => void;
}

export class ThreeSixNineGameImpl implements ThreeSixNineGame {
  constructor() {
    const players = ["짱구", "훈이", "맹구", "유리"];
    this.playGame(players);
  }

  do369(number: number) {
    for (let num of String(number)) {
      if (Number(num) % 3 === 0) return "clap";
    }

    return `${number}`;
  }

  playGame(players: string[]) {
    const numberList = Array.from({ length: 100 }, (_, i) => i + 1);
    const playerLength = players.length;
    numberList.forEach((number, i) => {
      const answer = this.do369(number);
      const player = players[i % playerLength];

      console.log(`${player}: ${answer}`);
    });
  }
}
