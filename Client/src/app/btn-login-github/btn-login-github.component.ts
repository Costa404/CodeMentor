import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-login-github',
  imports: [],
  templateUrl: './btn-login-github.component.html',
  styleUrl: './btn-login-github.component.css',
})
export class BtnloginGithubComponent {
  handleLogin() {
    const client_id = 'Iv23liyt9oJE5OAxui4m';
    const redirectUri = 'http://localhost:4200/callback';
    const scope = 'read:user';

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirectUri}&scope=${scope}`;

    window.location.href = authUrl;
  }
}
