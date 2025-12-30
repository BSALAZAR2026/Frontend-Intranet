import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../../../core/models/academy.models';
import { SafeUrlPipe } from '../../data/safe-url.pipe';
import { AcademyStateService } from '../../../../core/services/academy-state.service';

@Component({
  selector: 'app-pending-courses',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './pending-courses.html',
  styleUrls: ['./pending-courses.scss']
})
export class PendingCoursesComponent implements OnInit {

  pendingCourses: Course[] = [];
  selectedCourse: Course | null = null;

  constructor(public academyState: AcademyStateService) {}

  ngOnInit(): void {
  this.academyState.courses$.subscribe((courses: Course[]) => {
    this.pendingCourses = courses.filter((c: Course) => !c.examPassed);

    if (
      this.selectedCourse &&
      this.academyState.isCourseLockedById(this.selectedCourse.id)
    ) {
      this.selectedCourse = null;
    }
  });
}

selectCourse(course: Course): void {
  this.selectedCourse = course;
}
}
