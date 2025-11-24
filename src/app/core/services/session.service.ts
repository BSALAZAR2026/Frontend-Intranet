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
      localStorage.setItem('token', info.token);
    }
    this.loginInfoSubject.next(info);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getLoginInfo(): LoginInfo | null {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('loginInfo');
      if (stored) return JSON.parse(stored);
    }
    return this.loginInfoSubject.value;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp * 1000;
    return Date.now() > expiration;
  }

  clearSession() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('loginInfo');
      localStorage.removeItem('token');
    }
    this.loginInfoSubject.next(null);
  }
}
