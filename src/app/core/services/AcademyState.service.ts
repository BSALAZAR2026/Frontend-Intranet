import { Injectable } from '@angular/core';
import { Course } from '../models/academy.models';
import { COURSES } from '../../pages/academy/data/academy.data';

const STORAGE_KEY = 'academy_progress';

@Injectable({ providedIn: 'root' })
export class AcademyStateService {

  courses: Course[] = [];

  constructor() {
    this.loadState();
  }

  private loadState(): void {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      this.courses = JSON.parse(stored);
    } else {
      this.courses = COURSES.map(c => ({ ...c }));
      this.saveState();
    }
  }

  private saveState(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.courses));
  }

  isCourseLockedById(courseId: number): boolean {
    const index = this.courses.findIndex(c => c.id === courseId);
    if (index <= 0) return false;

    return !this.courses[index - 1].examPassed;
  }

  markExamPassed(courseId: number): void {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) return;

    course.examPassed = true;
    this.saveState();
  }

  resetProgress(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.loadState();
  }
}
