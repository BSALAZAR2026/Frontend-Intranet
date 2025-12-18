import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COURSES } from '../academy.data';
import { Course } from '../../../core/models/academy.models';
import { SafeUrlPipe } from '../safe-url.pipe';

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

  ngOnInit() {
    this.pendingCourses = COURSES.filter(c => !c.completed);
  }

  selectCourse(course: Course) {
    this.selectedCourse = course;
  }

  isLessonUnlocked(moduleIndex: number, lessonIndex: number): boolean {
    if (lessonIndex === 0) return true;
    return this.selectedCourse!
      .modules[moduleIndex]
      .lessons[lessonIndex - 1].completed;
  }

  completeLesson(moduleIndex: number, lessonIndex: number) {
    this.selectedCourse!
      .modules[moduleIndex]
      .lessons[lessonIndex].completed = true;
  }
}
