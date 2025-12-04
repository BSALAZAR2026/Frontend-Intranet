import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VIDEOS } from './videos.data';
import { SafeUrlPipe } from "./safe-url.pipe";

@Component({
  selector: 'app-academia',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './academy.html',
  styleUrl: './academy.scss'
})
export class AcademyComponent implements OnInit, AfterViewInit {

  allVideos = VIDEOS;
  loadedVideos: string[] = [];
  itemsPerLoad = 3;

  @ViewChild('infiniteTrigger') infiniteTrigger!: ElementRef;

  ngOnInit() {
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
