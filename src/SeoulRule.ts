import { Rule } from "./Rule";

export class SeoulRule implements Rule {
  private location = "서울";
  getLocation = () => {
    return this.location;
  };

  do369(number: number): string {
    const clapNumberList = String(number).match(/3|6|9+/g);

    return clapNumberList ? "clap" : `${number}`;
  }
}
