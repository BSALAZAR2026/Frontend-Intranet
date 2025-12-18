import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VIDEOS } from './videos.data';
import { SafeUrlPipe } from './safe-url.pipe';
import { LoginInfo } from '../../core/models/login-info.models';
import { SessionService } from '../../core/services/session.service';
import { PendingCoursesComponent } from './pending-courses/pending-courses';

@Component({
  selector: 'app-academia',
  standalone: true,
  imports: [
    CommonModule,
    SafeUrlPipe,
    PendingCoursesComponent
  ],
  templateUrl: './academy.html',
  styleUrl: './academy.scss'
})
export class AcademyComponent implements OnInit, AfterViewInit {

  allVideos = VIDEOS;
  loadedVideos: string[] = [];
  itemsPerLoad = 3;
  user: LoginInfo | null = null;

  @ViewChild('infiniteTrigger') infiniteTrigger!: ElementRef;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.user = this.sessionService.getLoginInfo();
    this.loadMore();
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        this.loadMore();
      }
    });

    observer.observe(this.infiniteTrigger.nativeElement);
  }

  loadMore() {
    const next = this.allVideos.splice(0, this.itemsPerLoad);
    this.loadedVideos.push(...next);
  }
}
