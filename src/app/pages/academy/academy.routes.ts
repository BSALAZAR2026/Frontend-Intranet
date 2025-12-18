import { Routes } from '@angular/router';
import { AcademyComponent } from './academy';
import { PendingCoursesComponent } from './pending-courses/pending-courses';
// import { CompletedCoursesComponent } from './completed-courses/completed-courses.component';
// import { CertificatesComponent } from './certificates/certificates.component';

export const ACADEMY_ROUTES: Routes = [
  {
    path: '',
    component: AcademyComponent,
    children: [
      { path: '', redirectTo: 'pending', pathMatch: 'full' },
      { path: 'pending', component: PendingCoursesComponent },
      // { path: 'completed', component: CompletedCoursesComponent },
      // { path: 'certificates', component: CertificatesComponent }
    ]
  }
];
