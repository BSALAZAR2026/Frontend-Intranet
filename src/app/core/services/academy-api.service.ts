import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseProgress } from '../models/academy-progress.model';

@Injectable({ providedIn: 'root' })
export class AcademyApiService {

  private baseUrl = 'https://intranet-api-gateway.onrender.com/api/academy/exam';

  constructor(private http: HttpClient) {}

  getProgress(): Observable<CourseProgress[]> {
    return this.http.get<CourseProgress[]>(`${this.baseUrl}/progress`);
  }
}
