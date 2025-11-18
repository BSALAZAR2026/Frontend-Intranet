import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BirthdayResponse {
  firstName: string;
  lastName: string;
  sede: string;
  birthdayDate: string; 
}

@Injectable({ providedIn: 'root' })
export class BirthdayService {
  private readonly apiUrl = 'http://localhost:8080/api/users/birthdays'; 

  constructor(private http: HttpClient) {}

  getAllBirthdays(): Observable<BirthdayResponse[]> {
    return this.http.get<BirthdayResponse[]>(this.apiUrl);
  }
}
