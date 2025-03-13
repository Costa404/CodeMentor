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
    path: ':username', // Página de repositórios do usuário
    loadComponent: () =>
      import(
        './Components/github-repositories/repo-list/repo-list.component'
      ).then((m) => m.RepoListComponent),
  },
  {
    path: ':username/:repo', // Página de detalhes do repositório
    loadComponent: () =>
      import(
        './Components/github-repositories/repoDetails/repo-details.component'
      ).then((m) => m.RepoDetailsComponent),
  },
  // {
  //   path: ':username/:repo/:filePath', // Página de visualização do arquivo
  //   loadComponent: () =>
  //     import(
  //       './Components/github-repositories/file-viewer/file-viewer.component'
  //     ).then((m) => m.FileViewerComponent),
  // },
];
