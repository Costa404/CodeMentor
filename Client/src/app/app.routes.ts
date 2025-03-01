import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CallbackComponent } from './callback/callback.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
];
