import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Components/homepage/homepage.component').then(
        (m) => m.HomepageComponent
      ),
  },
  {
    path: ':username',
    loadComponent: () =>
      import(
        './Components/github-repositories/repo-list/repo-list.component'
      ).then((m) => m.RepoListComponent),
  },
  {
    path: ':username/:repo',
    children: [
      {
        path: '', // Rota vazia para :username/:repo
        loadComponent: () =>
          import(
            './Components/github-repositories/repoDetails/repo-details.component'
          ).then((m) => m.RepoDetailsComponent),
      },
      {
        path: '**', // Captura tudo após :username/:repo
        loadComponent: () =>
          import(
            './Components/file-explorer-component/file-explorer-component.component'
          ).then((m) => m.FileExplorerComponent),
      },
    ],
  },
];
