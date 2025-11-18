import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';

export interface BirthdayResponse {
  firstName: string;
  lastName: string;
  sede: string;
  birthdayDate: string; 
}

@Injectable({ providedIn: 'root' })
export class BirthdayService {
  private readonly apiUrl = `${API_ENDPOINTS.birthdays}`; 

  constructor(private http: HttpClient) {}

  getAllBirthdays(): Observable<BirthdayResponse[]> {
    return this.http.get<BirthdayResponse[]>(this.apiUrl);
  }
}
