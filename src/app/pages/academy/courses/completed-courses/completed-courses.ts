import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../../../../core/models/academy.models';
import { AcademyStateService } from '../../../../core/services/academy-state.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CertificateService } from '../../../../core/services/certificate-api.service';

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
    private router: Router,
    private certificateService: CertificateService
  ) {}

  ngOnInit(): void {
    this.academyState.courses$
      .pipe(takeUntil(this.destroy$))
      .subscribe(courses => {
        this.completedCourses = courses.filter(c => c.examPassed);
      });
  }

  viewCertificate(course: Course): void {
    this.certificateService.openCertificate(course.id);
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
