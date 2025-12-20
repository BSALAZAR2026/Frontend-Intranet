import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SafeUrlPipe } from "../../data/safe-url.pipe";
import { Course } from "../../../../core/models/academy.models";
import { COURSES } from "../../data/academy.data";

@Component({
  selector: 'app-completed-courses',
  standalone: true,
  imports: [
    CommonModule,
    SafeUrlPipe
  ],
  templateUrl: './completed-courses.html',
  styleUrls: ['./completed-courses.scss']
})

export class CompletedCoursesComponent implements OnInit {

  completedCourses: Course[] = [];

  ngOnInit(): void {
    this.completedCourses = COURSES.filter(c => c.examPassed);
  }
}
