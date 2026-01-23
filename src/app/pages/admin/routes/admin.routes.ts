import { Routes } from '@angular/router';
import { AdminComponent } from '../admin';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'users', loadComponent: () => import('../users-list/users').then(m => m.UsersComponent) },
      { path: 'create-user', loadComponent: () => import('../create-users/create-user').then(m => m.CreateUsersComponent) },
      { path: 'change-email', loadComponent: () => import('../change-email/change-email').then(m => m.ChangeEmailComponent) },
      { path: 'change-password', loadComponent: () => import('../change-password/change-password').then(m => m.ChangePasswordComponent)},
      { path: 'desactivate-user', loadComponent: () => import('../desactivate-user/desactivate-user').then(m => m.DesactivateUserComponent) },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  }
];
