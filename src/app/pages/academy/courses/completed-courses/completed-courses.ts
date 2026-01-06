import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../../../../core/models/academy.models';
import { AcademyStateService } from '../../../../core/services/academy-state.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-completed-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './completed-courses.html',
  styleUrls: ['./completed-courses.scss']
})
export class CompletedCoursesComponent implements OnInit, OnDestroy {

  completedCourses: Course[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private academyState: AcademyStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.academyState.courses$
      .pipe(takeUntil(this.destroy$))
      .subscribe(courses => {
        this.completedCourses = courses.filter(c => c.examPassed);
      });
  }

  viewCertificate(course: Course): void {
    this.router.navigate(
      ['/academy/certificates'],
      { queryParams: { courseId: course.id } }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
