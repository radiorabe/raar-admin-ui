import { CrudModel } from "src/app/shared/models/crud.model";

export class AccessCodeModel extends CrudModel {
  attributes: {
    code: string | void;
    expires_at: Date | void;
  } = {
    code: undefined,
    expires_at: undefined
  };

  toString(): string {
    return "Bis " + this.expires_at_string;
  }

  init(): void {
    if (this.attributes.expires_at) {
      this.attributes.expires_at = new Date(this.attributes.expires_at);
    }
  }

  get expires_at_string(): string | void {
    if (this.attributes.expires_at) {
      return this.formatDate(this.attributes.expires_at);
    }
  }

  private formatDate(date: Date): string {
    return (
      this.leftPad(date.getDate()) +
      "." +
      this.leftPad(date.getMonth() + 1) +
      "." +
      date.getFullYear()
    );
  }

  private leftPad(n: number): string {
    if (n < 9) {
      return "0" + n;
    }
    return n.toString();
  }
}
