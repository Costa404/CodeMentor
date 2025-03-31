import { Component } from '@angular/core';
import { NavbarComponent } from './Components/navbar/navbar.component';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { filter, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    CommonModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CodeMentor';
  status = '';
  loading!: Observable<boolean>;

  constructor(private router: Router) {
    this.loading = this.router.events.pipe(
      filter((event) =>
        [
          NavigationStart,
          NavigationEnd,
          NavigationError,
          NavigationCancel,
        ].some((constructor) => event instanceof constructor)
      ),
      map((event) => event instanceof NavigationStart),
      tap((isLoading) => {
        this.status = isLoading ? 'navigating' : 'done';
      })
    );
  }
}
