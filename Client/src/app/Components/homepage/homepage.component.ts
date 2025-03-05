import { Component } from '@angular/core';
import { BtnloginGithubComponent } from './btn-login-github/btn-login-github.component';
import { GithubRepositoriesComponent } from '../github-repositories/github-repositories.component';

@Component({
  selector: 'app-homepage',
  imports: [BtnloginGithubComponent, GithubRepositoriesComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
