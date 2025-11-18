import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LoginInfo } from '../models/login-info.models';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private loginInfoSubject = new BehaviorSubject<LoginInfo | null>(null);
  loginInfo$ = this.loginInfoSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setLoginInfo(info: LoginInfo) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('loginInfo', JSON.stringify(info));
    }
    this.loginInfoSubject.next(info);
  }

  getLoginInfo(): LoginInfo | null {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('loginInfo');
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return this.loginInfoSubject.value;
  }

  clearSession() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('loginInfo');
    }
    this.loginInfoSubject.next(null);
  }
}
