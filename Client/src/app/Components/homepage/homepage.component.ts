import { Component } from '@angular/core';

import { GithubRepositoriesComponent } from '../github-repositories/github-repositories.component';

@Component({
  selector: 'app-homepage',
  imports: [GithubRepositoriesComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
