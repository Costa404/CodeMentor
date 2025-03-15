import { Component, OnInit } from '@angular/core';
import { AuthService } from './Components/dashboard/auth.service'; // Importa o serviço de autenticação
import { NavbarComponent } from './Components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CodeMentor';
  //   user: any = null;
  //   constructor(private authService: AuthService) {}
  //   ngOnInit(): void {
  //     //using BehaviorSubject
  //     this.authService.getUserObservable().subscribe((user) => {
  //       this.user = user;
  //     });

  //     this.authService.fetchUser();
  //   }

  //   login(): void {
  //     this.authService.loginWithGitHub();
  //   }
  // }

  constructor() {}
}
