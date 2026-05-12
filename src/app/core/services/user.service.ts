import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { API_ENDPOINTS } from '../constants/api.constants';
import { LoginInfo } from '../models/login-info.models';
import { User } from '../models/user.model';
import { UserA } from '../models/user-admin.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${API_ENDPOINTS.users}`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getCurrentUser(): Observable<User> {
    if (!isPlatformBrowser(this.platformId)) {
      console.log("USER: ",null as unknown as User)
      return of(null as unknown as User);
    }

    return this.http.get<LoginInfo>(`${this.apiUrl}/me`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      map((info: LoginInfo): User => ({
        ...info,
        loginTime:
          info.loginTime instanceof Date
            ? info.loginTime.toISOString()
            : info.loginTime
      }))
    );
  }

  getUserById(id: string): Observable<User> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(null as unknown as User);
    }

    return this.http.get<User>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getAuthByUserId(userId: string): Observable<any> {

  return this.http.get<any>(
    `${API_ENDPOINTS.auth}/${userId}`,
    {
      headers: this.getAuthHeaders(),
    }
  );

}

  updateUserProfile(id: string, data: Partial<User>): Observable<User> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(null as unknown as User);
    }

    return this.http.put<User>(`${this.apiUrl}/${id}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  getAllAdminUsers(): Observable<UserA[]> {
    if (!isPlatformBrowser(this.platformId)) return of([]);

    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    }).pipe(
      map(users => users.map(u => ({
        id: u.id!,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        phone: u.phone,
        position: u.position,
        sede: u.sede,
        area: u.area,
        status: u.status
      } as UserA)))
    );
  }

  createAdminUser(data: any): Observable<UserA> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(null as unknown as UserA);
    }

    return this.http.post<any>(`${this.apiUrl}`, data, {
      headers: this.getAuthHeaders(),
    }).pipe(
      map(u => this.mapToAdminUser(u))
    );
  }

  updateAdminUser(id: string, data: any): Observable<UserA> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(null as unknown as UserA);
    }

    return this.http.put<any>(`${this.apiUrl}/${id}`, data, {
      headers: this.getAuthHeaders(),
    }).pipe(
      map(u => this.mapToAdminUser(u))
    );
  }

  deleteAdminUser(id: string): Observable<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(void 0);
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateAdminEmail(id: string, email: string): Observable<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(void 0);
    }

    return this.http.put<void>(`${this.apiUrl}/${id}/email`, 
      { email },
      { headers: this.getAuthHeaders() }
    );
  }


  private mapToAdminUser(u: any): UserA {
    return {
      id: u.id!,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      phone: u.phone,
      position: u.position,
      sede: u.sede,
      area: u.area,
      status: u.status
    };
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
