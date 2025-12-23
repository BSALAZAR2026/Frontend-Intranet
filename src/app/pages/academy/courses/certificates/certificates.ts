import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Course } from "../../../../core/models/academy.models";
import { COURSES } from "../../data/academy.data";

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

  ngOnInit(): void {
    this.certifiedCourses = COURSES.filter(c => c.examPassed);
  }
}
