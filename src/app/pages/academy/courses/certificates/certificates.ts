import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { Course } from "../../../../core/models/academy.models";
import { AcademyStateService } from "../../data/AcademyStateService";

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
    this.certifiedCourses = this.academyState.courses
      .filter(c => c.examPassed);
  }

}
