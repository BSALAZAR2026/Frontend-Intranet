import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Course } from "../models/academy.models";
import { UserCourseProgress } from "../models/user-course.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AcademyApiService {

  private readonly baseUrl =
    'https://api-gateway-v121.onrender.com/api/academy';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/courses`);
  }

  enroll(courseId: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/user-courses/enroll`,
      { courseId }
    );
  }

  approve(courseId: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/user-courses/${courseId}/approve`,
      {}
    );
  }

  getMyCourses(): Observable<UserCourseProgress[]> {
    return this.http.get<UserCourseProgress[]>(
      `${this.baseUrl}/user-courses/me`
    );
  }
}
