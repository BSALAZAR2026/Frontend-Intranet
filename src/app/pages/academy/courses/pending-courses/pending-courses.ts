import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COURSES } from '../../data/academy.data';
import { Course } from '../../../../core/models/academy.models';
import { SafeUrlPipe } from '../../data/safe-url.pipe';

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

  ngOnInit(): void {
    this.pendingCourses = COURSES.filter(c => !c.examPassed);
  }
  selectCourse(course: Course): void {
    this.selectedCourse = course;
  }
}
