import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from '../../core/services/session.service';
import { UserService } from '../../core/services/user.service';
import { LoginInfo } from '../../core/models/login-info.models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule, RouterModule]
})
export class NavbarComponent implements OnInit {

  user: LoginInfo | null = null;
  isMenuOpen: boolean = false;

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userService.getCurrentUser().subscribe({
        next: (data) => {
          this.user = { ...data, loginTime: new Date() };
          this.sessionService.setLoginInfo(this.user);
        }
      });
    }
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  toggleMenu(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menu toggled:', this.isMenuOpen);
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    
    if (target.closest('.menu-toggle') || 
        target.closest('.side-menu') || 
        target.closest('.user-container') ||
        target.closest('.mat-mdc-menu-panel')) {
      return;
    }
    
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }

  logout(): void {
    this.sessionService.clearSession();
    this.router.navigate(['/login']);
  }
}