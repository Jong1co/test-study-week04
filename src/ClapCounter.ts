export interface ClapCounter {
  printClapCount: () => void;
  addClapCount: (count: number) => void;
}

export class ClapCounterImpl implements ClapCounter {
  private clapCount: number;
  constructor() {
    this.clapCount = 0;
  }

  printClapCount() {
    console.log(this.clapCount);
  }

  addClapCount(count: number) {
    this.clapCount += count;
  }
}
