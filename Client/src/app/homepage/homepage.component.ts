import { Component } from '@angular/core';
import { BtnloginGithubComponent } from '../btn-login-github/btn-login-github.component';

@Component({
  selector: 'app-homepage',
  imports: [BtnloginGithubComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
