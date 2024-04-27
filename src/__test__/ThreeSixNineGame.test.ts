import { BusanRule } from "../BusanRule";
import { Player, PlayerImpl } from "../Player";
import { SeoulRule } from "../SeoulRule";
import { ThreeSixNineGame, ThreeSixNineGameImpl } from "../TreeSixNineGame";
import { Util } from "../Util";

export const getLogSpy = () => {
  const logSpy = jest.spyOn(console, "log");
  logSpy.mockClear();
  return logSpy;
};

describe("369 게임", () => {
  describe("서울 - do369", () => {
    let threeSixNineGame: ThreeSixNineGame;

    beforeEach(() => {
      threeSixNineGame = new ThreeSixNineGameImpl(new SeoulRule());
    });

    it("3, 6, 9가 포함되어 있다면, 박수를 한 번 쳐야 한다.", () => {
      expect(threeSixNineGame.do369(3)).toBe("clap");
      expect(threeSixNineGame.do369(16)).toBe("clap");
      expect(threeSixNineGame.do369(10)).toBe("10"); // 0일 경우에도 나머지 0이 나옴
      expect(threeSixNineGame.do369(33)).toBe("clap");
    });

    it("3, 6, 9가 포함되어 있지 않다면, 숫자를 반환해야 한다.", () => {
      expect(threeSixNineGame.do369(4)).toBe("4");
      expect(threeSixNineGame.do369(12)).toBe("12");
      expect(threeSixNineGame.do369(51)).toBe("51");
    });
  });

  describe("부산 - do369", () => {
    let threeSixNineGame: ThreeSixNineGame;

    beforeEach(() => {
      threeSixNineGame = new ThreeSixNineGameImpl(new BusanRule());
    });

    it("3, 6, 9가 포함되어 있다면, clap", () => {
      expect(threeSixNineGame.do369(3)).toBe("clap");
      expect(threeSixNineGame.do369(16)).toBe("clap");
      expect(threeSixNineGame.do369(10)).toBe("10"); // 0일 경우에도 나머지 0이 나옴
      expect(threeSixNineGame.do369(33)).toBe("clapclap");
    });

    it("3, 6, 9가 포함되어 있지 않다면, 숫자를 반환해야 한다.", () => {
      expect(threeSixNineGame.do369(4)).toBe("4");
      expect(threeSixNineGame.do369(12)).toBe("12");
      expect(threeSixNineGame.do369(51)).toBe("51");
    });
  });

  describe("playGame>오답률이 100퍼센트 일 경우", () => {
    let threeSixNineGame: ThreeSixNineGame;
    let players: Player[];

    beforeEach(() => {
      threeSixNineGame = new ThreeSixNineGameImpl(new BusanRule());
      players = [
        { name: "짱구", incorrectAnswerRate: 1 }, //
        { name: "훈이", incorrectAnswerRate: 0 },
        { name: "맹구", incorrectAnswerRate: 0 },
        { name: "유리", incorrectAnswerRate: 0 },
      ].map((variable) => new PlayerImpl(variable));
    });

    it("게임을 종료합니다 메세지 ", async () => {
      const logSpy = getLogSpy();
      await threeSixNineGame.playGame(players);

      // then
      ["짱구", "게임을 종료합니다."].forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });

      expect(logSpy).toHaveBeenCalledTimes(2);
    });
  });
});

describe("369게임 > isTurnOfIncorrectAnswer", () => {
  let threeSixNineGame: ThreeSixNineGame;

  beforeEach(() => {
    threeSixNineGame = new ThreeSixNineGameImpl(new SeoulRule());
  });

  it("오답률이 랜덤 숫자보다 작을 경우 정답이어야 한다. (false를 반환해야 한다.)", () => {
    Util.random = jest.fn().mockReturnValueOnce(1); // 랜덤 숫자

    const result = threeSixNineGame.isTurnOfIncorrectAnswer(
      new PlayerImpl({ name: "짱구", incorrectAnswerRate: 0.3 }) //
    );

    expect(result).toBe(false);
  });

  it("오답률이 랜덤 숫자보다 클 경우 오답이어야 한다. (true를 반환해야 한다.)", () => {
    Util.random = jest.fn().mockReturnValueOnce(0.2); // 랜덤 숫자

    const result = threeSixNineGame.isTurnOfIncorrectAnswer(
      new PlayerImpl({ name: "짱구", incorrectAnswerRate: 0.3 }) //
    );

    expect(result).toBe(true);
  });

  it("오답률이 랜덤 숫자와 같을 경우 오답이어야 한다. (true를 반환해야 한다.)", () => {
    Util.random = jest.fn().mockReturnValueOnce(0.3); // 랜덤 숫자

    const result = threeSixNineGame.isTurnOfIncorrectAnswer(
      new PlayerImpl({ name: "짱구", incorrectAnswerRate: 0.3 }) //
    );

    expect(result).toBe(true);
  });
});
