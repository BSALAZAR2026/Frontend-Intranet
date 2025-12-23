import { Injectable } from "@angular/core";
import { Course } from "../../../core/models/academy.models";

@Injectable({ providedIn: 'root' })
export class AcademyStateService {
  courses: Course[] = [];

  isCourseLocked(index: number): boolean {
    if (index === 0) return false;

    const prev = this.courses[index - 1];
    return !(prev.videoCompleted && prev.examPassed);
  }
}
