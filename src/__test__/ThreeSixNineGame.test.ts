import { ThreeSixNineGame, ThreeSixNineGameImpl } from "..";

export const getLogSpy = () => {
  const logSpy = jest.spyOn(console, "log");
  logSpy.mockClear();
  return logSpy;
};

describe("369 게임", () => {
  describe("do369", () => {
    let threeSixNineGame: ThreeSixNineGame;

    beforeEach(() => {
      threeSixNineGame = new ThreeSixNineGameImpl();
    });

    it("3이 포함되어 있다면, 박수를 한 번 쳐야 한다.", () => {
      expect(threeSixNineGame.do369(3)).toBe("clap");
      expect(threeSixNineGame.do369(16)).toBe("clap");
      expect(threeSixNineGame.do369(33)).toBe("clap");
    });

    it("3이 포함되어 있지 않다면, 숫자를 반환해야 한다.", () => {
      expect(threeSixNineGame.do369(4)).toBe("4");
      expect(threeSixNineGame.do369(12)).toBe("12");
      expect(threeSixNineGame.do369(51)).toBe("51");
    });
  });

  describe("playGame", () => {
    let threeSixNineGame: ThreeSixNineGame;
    let players: string[];
    const logSpy = getLogSpy();

    beforeEach(() => {
      threeSixNineGame = new ThreeSixNineGameImpl();
      players = ["짱구", "훈이", "맹구", "유리"];
    });

    it("player의 이름이 포함되어야 한다.", () => {
      expect(threeSixNineGame.playGame(players));

      const messages = Array.from(
        { length: 100 },
        (_, i) => players[i % players.length]
      );

      // then
      messages.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    it("정답에 3, 6, 9가 존재해선 안 된다.", () => {
      expect(threeSixNineGame.playGame(players));

      const messages = Array.from(
        { length: 100 },
        (_, i) => players[i % players.length]
      );

      // then
      messages.forEach((output) => {
        expect(logSpy).not.toHaveBeenCalledWith(expect.stringContaining("3"));
        expect(logSpy).not.toHaveBeenCalledWith(expect.stringContaining("6"));
        expect(logSpy).not.toHaveBeenCalledWith(expect.stringContaining("9"));
      });
    });
  });
});
