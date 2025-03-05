import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../dashboard/auth.service';

@Component({
  selector: 'app-btn-login-github',
  templateUrl: './btn-login-github.component.html',
})
export class BtnloginGithubComponent {
  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.loginWithGitHub();
  }
}
