import { Injectable } from '@angular/core';
import { Course } from '../models/academy.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AcademyStateService {

  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  get courses(): Course[] {
    return this.coursesSubject.value;
  }

  loadCourses(courses: Course[]): void {
    const sorted = [...courses].sort((a, b) => a.id - b.id);
    this.coursesSubject.next(sorted.map(c => ({ ...c })));
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

  isCourseLockedById(courseId: number): boolean {
    const courses = this.courses;
    const index = courses.findIndex(c => c.id === courseId);

    if (index === -1 || index === 0) {
      return false;
    }

    return courses
      .slice(0, index)
      .some(c => !c.examPassed);
  }
}

