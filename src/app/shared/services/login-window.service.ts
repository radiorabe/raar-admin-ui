import { EventEmitter } from "@angular/core";

export class LoginWindowService {
  show$ = new EventEmitter<boolean>();
  closed$ = new EventEmitter<boolean>();

  show(userLogin = false) {
    this.show$.emit(userLogin);
  }

  closed() {
    this.closed$.emit();
  }
}
