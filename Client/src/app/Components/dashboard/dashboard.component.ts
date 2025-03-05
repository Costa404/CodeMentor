import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: any = null;
  private userSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // 🔥 Ouvindo as mudanças do BehaviorSubject
    this.userSubscription = this.authService
      .getUserObservable()
      .subscribe((user) => {
        console.log('Novo valor recebido no subscribe():', user);
        this.user = user;
      });

    if (!this.user) {
      this.authService.fetchUser();
    }
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
