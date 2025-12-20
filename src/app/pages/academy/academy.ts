import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginInfo } from '../../core/models/login-info.models';
import { SessionService } from '../../core/services/session.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-academia',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './academy.html',
  styleUrl: './academy.scss'
})
export class AcademyComponent implements OnInit {

  user: LoginInfo | null = null;
  showIntroVideo = true;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Solo mostrar video en el landing /academy
        this.showIntroVideo = event.urlAfterRedirects === '/academy';
      });
  }

  ngOnInit(): void {
    this.user = this.sessionService.getLoginInfo();
  }
}
