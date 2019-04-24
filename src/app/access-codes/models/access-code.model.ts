import * as moment from "moment";
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

  get expires_at_string(): string | void {
    if (this.attributes.expires_at) {
      return moment(this.attributes.expires_at).format("DD.MM.Y");
    }
  }
}
