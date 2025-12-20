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
    this.pendingCourses = COURSES.filter(course => !course.completed);
  }

  selectCourse(course: Course): void {
    this.selectedCourse = course;
  }

  isLessonUnlocked(moduleIndex: number, lessonIndex: number): boolean {
    if (!this.selectedCourse) return false;
    if (lessonIndex === 0) return true;

    return this.selectedCourse
      .modules[moduleIndex]
      .lessons[lessonIndex - 1].completed;
  }

  completeLesson(moduleIndex: number, lessonIndex: number): void {
    if (!this.selectedCourse) return;

    this.selectedCourse
      .modules[moduleIndex]
      .lessons[lessonIndex].completed = true;
  }
}
