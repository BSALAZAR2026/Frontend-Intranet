import { Injectable } from '@angular/core';
import { Course } from '../models/academy.models';
import { AcademyApiService } from './academy-api.service';
import { CourseProgress } from '../models/academy-progress.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AcademyStateService {

  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  get courses(): Course[] {
    return this.coursesSubject.value;
  }

  loadCourses(courses: Course[]): void {
    this.coursesSubject.next(courses.map(c => ({ ...c })));
  }

  syncProgress(progress: { courseId: number; examPassed: boolean }[]): void {
    const updated = this.courses.map(course => {
      const match = progress.find(p => p.courseId === course.id);
      return match ? { ...course, examPassed: match.examPassed } : course;
    });

    this.coursesSubject.next(updated);
  }

  markPassed(courseId: number): void {
    this.coursesSubject.next(
      this.courses.map(c =>
        c.id === courseId ? { ...c, examPassed: true } : c
      )
    );
  }
}
