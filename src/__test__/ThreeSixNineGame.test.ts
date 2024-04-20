import { ThreeSixNineGame, ThreeSixNineGameImpl } from "..";

describe("369 게임", () => {
  let threeSixNineGame: ThreeSixNineGame;

  beforeEach(() => {
    threeSixNineGame = new ThreeSixNineGameImpl();
  });

  it("do369>3이 포함되어 있다면, 박수를 한 번 쳐야 한다.", () => {
    expect(threeSixNineGame.do369(3)).toBe("clap");
    expect(threeSixNineGame.do369(16)).toBe("clap");
    expect(threeSixNineGame.do369(33)).toBe("clap");
  });

  it("do369>3이 포함되어 있지 않다면, 숫자를 반환해야 한다.", () => {
    expect(threeSixNineGame.do369(4)).toBe("4");
    expect(threeSixNineGame.do369(12)).toBe("12");
    expect(threeSixNineGame.do369(51)).toBe("51");
  });
});
