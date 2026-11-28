import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthState {
  private readonly loginState = signal(false);
  readonly loggedIn = this.loginState.asReadonly();

  setLoggedIn(loggedIn: boolean): void {
    this.loginState.set(loggedIn);
  }

  toggleLogin(): void {
    this.loginState.update(loggedIn => !loggedIn);
  }
}
