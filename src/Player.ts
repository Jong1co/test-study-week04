export interface Player {
  name: string;
  incorrectAnswerRate: number;
}

export class PlayerImpl implements Player {
  name: string;
  incorrectAnswerRate: number;

  constructor({
    name,
    incorrectAnswerRate,
  }: {
    name: string;
    incorrectAnswerRate: number;
  }) {
    this.name = name;
    this.incorrectAnswerRate = incorrectAnswerRate;
  }
}
