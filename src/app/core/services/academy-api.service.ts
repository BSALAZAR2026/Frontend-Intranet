import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Course } from "../models/academy.models";

@Injectable({ providedIn: 'root' })
export class AcademyApiService {

  private readonly baseUrl = '/api/academy';

  constructor(private http: HttpClient) {}

  getCourses() {
    return this.http.get<Course[]>(`${this.baseUrl}/courses`);
  }
}
