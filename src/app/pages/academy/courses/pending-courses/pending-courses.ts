import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../../../core/models/academy.models';
import { SafeUrlPipe } from '../../data/safe-url.pipe';
import { AcademyStateService } from '../../../../core/services/academy-state.service';
import { AcademyApiService } from '../../../../core/services/academy-api.service';
import { Subject, takeUntil } from 'rxjs';
import { SessionService } from '../../../../core/services/session.service';

@Component({
  selector: 'app-pending-courses',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './pending-courses.html',
  styleUrls: ['./pending-courses.scss']
})
export class PendingCoursesComponent implements OnInit, OnDestroy {

  pendingCourses: Course[] = [];
  selectedCourse: Course | null = null;

  hasEnrolled = false;

  private destroy$ = new Subject<void>();

  constructor(
    public academyState: AcademyStateService,
    private academyApi: AcademyApiService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.academyState.courses$
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses: Course[]) => {
        this.pendingCourses = courses.filter(c => !c.examPassed);

        if (
          this.selectedCourse &&
          this.academyState.isCourseLockedById(this.selectedCourse.id)
        ) {
          this.selectedCourse = null;
        }
      });
  }

  selectCourse(course: Course): void {
    if (this.academyState.isCourseLockedById(course.id)) return;
    this.selectedCourse = course;
    this.hasEnrolled = false;
  }

  enrollSelectedCourse(): void {
    if (!this.selectedCourse) return;

    this.academyApi.enroll(this.selectedCourse.id).subscribe({
      next: () => {
        this.hasEnrolled = true;
        this.academyState.loadFromBackend();
      },
      error: err => {
        if (err?.error?.code === 'USER_ALREADY_ENROLLED') {
          this.hasEnrolled = true;
        } else {
          console.error('Error al inscribirse', err);
        }
      }
    });
  }

    get examUrlWithUser(): string {
    if (!this.selectedCourse) return '';

    const userId = this.sessionService.getLoginInfo()?.id;
    return `${this.selectedCourse.examUrl}?userId=${userId}`;
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
