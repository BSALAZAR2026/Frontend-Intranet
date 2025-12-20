import { Routes } from '@angular/router';
import { AcademyComponent } from '../academy';
import { AcademyCoursesLayoutComponent } from '../courses/layout/layout-courses';
import { PendingCoursesComponent } from '../courses/pending-courses/pending-courses';

export const ACADEMY_ROUTES: Routes = [
  {
    path: '',
    component: AcademyComponent
  },
  {
    path: 'courses',
    component: AcademyCoursesLayoutComponent,
    children: [
      { path: '', redirectTo: 'pending', pathMatch: 'full' },
      { path: 'pending', component: PendingCoursesComponent },
      // { path: 'completed', component: CompletedCoursesComponent },
      // { path: 'certificates', component: CertificatesComponent }
    ]
  }
];
