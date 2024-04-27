import { Rule } from "./Rule";

export class BusanRule implements Rule {
  private location = "부산";

  getLocation = () => {
    return this.location;
  };

  do369(number: number): string {
    const clapNumberList = String(number).match(/3|6|9+/g);

    return clapNumberList ? "clap".repeat(clapNumberList.length) : `${number}`;
  }
}
