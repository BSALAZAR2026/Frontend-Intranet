import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () =>
      import('./layouts/auth-layout/auth.routes').then(m => m.AUTH_ROUTES)
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home').then((m) => m.HomeComponent),
        data: { prerender: false }
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile').then((m) => m.ProfilePageComponent),
        data: { prerender: false }
      },
      {
        path: 'academy',
        loadComponent: () =>
          import('./pages/academy/academy').then((m) => m.AcademyComponent),
        data: { prerender: false }
      },
      {
        path: 'documents',
        loadComponent: () =>
          import('./pages/documents/documents').then((m) => m.DocumentsComponent),
        data: { prerender: false }
      },
      {
        path: 'requeriments',
        loadComponent: () =>
          import('./pages/requeriments/requeriments').then((m) => m.RequerimentsComponent),
        data: { prerender: false }
      },
    ]
  },

  { path: '**', redirectTo: 'auth/login' }
];
