import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoginCredentials } from '../../pages/login/login';
import { API_ENDPOINTS } from '../constants/api.constants';
import { isPlatformBrowser } from '@angular/common';
import { PasswordCredentials } from '../../pages/change-password/change-password';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${API_ENDPOINTS.auth}`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credentials: LoginCredentials): Observable<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(null);
    }
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  changePassword(credentials: PasswordCredentials): Observable<any> {
  if (!isPlatformBrowser(this.platformId)) {
      return of(null);
  }
    return this.http.put(`${this.apiUrl}/password`, credentials);
  }
}
