import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COURSES } from '../../data/academy.data';
import { Course } from '../../../../core/models/academy.models';
import { SafeUrlPipe } from '../../data/safe-url.pipe';
import { AcademyStateService } from '../../../../core/services/AcademyState.service';

@Component({
  selector: 'app-pending-courses',
  standalone: true,
  imports: [
    CommonModule,
    SafeUrlPipe
  ],
  templateUrl: './pending-courses.html',
  styleUrls: ['./pending-courses.scss']
})
export class PendingCoursesComponent implements OnInit {

  pendingCourses: Course[] = [];
  selectedCourse: Course | null = null;

  constructor(public academyState: AcademyStateService) {}

  ngOnInit(): void {
    this.pendingCourses = this.academyState.courses
      .filter(c => !c.examPassed);
  }

  selectCourse(course: Course): void {
    this.selectedCourse = course;
  }
}
