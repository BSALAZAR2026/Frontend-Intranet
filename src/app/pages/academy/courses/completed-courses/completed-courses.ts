import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Course } from "../../../../core/models/academy.models";
import { AcademyStateService } from "../../data/AcademyStateService";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-completed-courses',
  standalone: true,
  imports: [
    CommonModule
],
  templateUrl: './completed-courses.html',
  styleUrls: ['./completed-courses.scss']
})

export class CompletedCoursesComponent implements OnInit {

  constructor(private academyState: AcademyStateService, private router: Router, private route: ActivatedRoute){}

  completedCourses: Course[] = [];

  ngOnInit(): void {
    this.completedCourses = this.academyState.courses
    .filter(c => c.examPassed);
  }

  viewCertificate(course: Course): void {
    this.router.navigate(['../certificates'], {
      state: { courseId: course.id }
    });
  }

  
}
