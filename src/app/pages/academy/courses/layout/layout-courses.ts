import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-academy-courses-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout-courses.html',
  styleUrl: './layout-courses.scss'
})
export class AcademyCoursesLayoutComponent {}
