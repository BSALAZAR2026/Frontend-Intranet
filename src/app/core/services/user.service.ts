import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { API_ENDPOINTS } from '../constants/api.constants';
import { LoginInfo } from '../models/login-info.models';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${API_ENDPOINTS.users}`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

 getCurrentUser(): Observable<User> {
  return this.http.get<LoginInfo>(`${this.apiUrl}/me`, {
    headers: this.getAuthHeaders(),
  }).pipe(
    map((info: LoginInfo): User => ({
      ...info,
      loginTime: info.loginTime instanceof Date 
        ? info.loginTime.toISOString() 
        : info.loginTime
    }))
  );
}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateUserProfile(id: string, data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  private getAuthHeaders(isJson = true): HttpHeaders {
    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    if (isJson) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return headers;
  }
}
