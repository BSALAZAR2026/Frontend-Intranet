import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { Course } from "../../../../core/models/academy.models";
import { AcademyStateService } from "../../../../core/services/AcademyState.service";

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './certificates.html',
  styleUrls: ['./certificates.scss']
})

export class CertificatesComponent implements OnInit {

  certifiedCourses: Course[] = [];

  constructor(private academyState: AcademyStateService) {}

  ngOnInit(): void {
    const courseId = history.state?.courseId;

    const passedCourses = this.academyState.courses
      .filter(c => c.examPassed);

    this.certifiedCourses = courseId
      ? passedCourses.filter(c => c.id === courseId)
      : passedCourses;
  }

  downloadCertificate(course: Course): void {
    alert(`Descargando certificado de: ${course.title}`);
  }
}
