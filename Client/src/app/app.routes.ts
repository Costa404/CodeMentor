import { Routes } from '@angular/router';
import { HomepageComponent } from './Components/homepage/homepage.component';

import { DashboardComponent } from './Components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
