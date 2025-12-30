import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../../../core/models/academy.models';
import { SafeUrlPipe } from '../../data/safe-url.pipe';
import { AcademyStateService } from '../../../../core/services/academy-state.service';
import { UserCourseProgress } from '../../../../core/models/user-course.model';
import { AcademyApiService } from '../../../../core/services/academy-api.service';

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

  constructor(
    public academyState: AcademyStateService,
    private academyApi: AcademyApiService
  ) {}

  ngOnInit(): void {
    this.academyState.courses$.subscribe((courses: Course[]) => {
      this.pendingCourses = courses.filter(
        (c: Course) => !c.examPassed
      );

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
  this.academyApi.enroll(course.id).subscribe({
    next: () => {
    },
    error: err => {
      if (err?.error?.code !== 'USER_ALREADY_ENROLLED') {
        console.error('Error al inscribirse', err);
      }
    }
  });
}


  completeCourse(course: Course): void {
  this.academyApi.approve(course.id).subscribe({
    next: () => {
      this.academyApi.getMyCourses().subscribe(
        (progress: UserCourseProgress[]) => {
          this.academyState.syncProgress(progress);
        }
      );
    },
    error: (err: unknown) => {
      console.error('Error aprobando curso', err);
    }
  });
}
}

