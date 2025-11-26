import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './guards/auth.guard';
import { reverseAuthGuard } from './guards/reverse.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () => import('./layouts/auth-layout/auth.routes')
      .then(m => m.AUTH_ROUTES),
      canActivate: [reverseAuthGuard]
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)},
      { path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.ProfilePageComponent)},
      { path: 'academy', loadComponent: () => import('./pages/academy/academy').then(m => m.AcademyComponent)},
      { path: 'documents', loadComponent: () => import('./pages/documents/documents').then(m => m.DocumentsComponent)},
      { path: 'requeriments', loadComponent: () => import('./pages/requeriments/requeriments').then(m => m.RequerimentsComponent)},
      {path: 'change-password', loadComponent: () => import('./pages/change-password/change-password').then(m => m.ChangePasswordComponent)}
    ]
  },

  { path: '**', redirectTo: 'auth/login' }
];

