import { Injectable } from "@angular/core";
import { Course } from "../../../core/models/academy.models";
import { COURSES } from "./academy.data";

@Injectable({ providedIn: 'root' })
export class AcademyStateService {

  courses: Course[] = [...COURSES];

    isCourseLockedById(courseId: number): boolean {
      const index = this.courses.findIndex(c => c.id === courseId);
      if (index <= 0) return false;

    return !this.courses[index - 1].examPassed;
  }
}
