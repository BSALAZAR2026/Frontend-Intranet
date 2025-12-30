import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginInfo } from '../../core/models/login-info.models';
import { SessionService } from '../../core/services/session.service';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { COURSES } from '.././academy/data/academy.data';
import { Course } from '../../core/models/academy.models';
import { filter } from 'rxjs';
import { AcademyStateService } from '../../core/services/academy-state.service';
import { AcademyApiService } from '../../core/services/academy-api.service';

@Component({
  selector: 'app-academia',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './academy.html',
  styleUrl: './academy.scss'
})

export class AcademyComponent implements OnInit {

  user: LoginInfo | null = null;
  showIntroVideo = true;
  courses: Course[] = [];

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private academyState: AcademyStateService,
    private academyApi: AcademyApiService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showIntroVideo = event.urlAfterRedirects === '/academy';
      });
  }

  ngOnInit(): void {
    
    this.user = this.sessionService.getLoginInfo();

    this.academyState.loadCourses(COURSES);

    this.academyApi.getProgress().subscribe({
      next: progress => {
        this.academyState.syncProgress(progress);
        this.courses = this.academyState.courses;
      },
      error: err => {
        console.error('Error cargando progreso', err);
        this.courses = this.academyState.courses;
      }
    });
  }
}
