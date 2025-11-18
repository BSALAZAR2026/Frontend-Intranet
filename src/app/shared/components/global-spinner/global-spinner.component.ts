import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-global-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    @if (isLoading()) {
      <div class="overlay">
        <mat-progress-spinner diameter="56" mode="indeterminate"></mat-progress-spinner>
      </div>
    }
  `,
  styles: [`
    .overlay {
      position: fixed;
      inset: 0;
      display:flex;
      align-items:center;
      justify-content:center;
      background: rgba(0,0,0,0.12);
      z-index: 2000;
      pointer-events: none;
    }
    mat-progress-spinner {
      pointer-events: auto;
      background: white;
      border-radius: 50%;
      padding: 6px;
    }
  `]
})
export class GlobalSpinnerComponent {
  private loadingService = inject(LoadingService);
  isLoading = this.loadingService.isLoading;
}
