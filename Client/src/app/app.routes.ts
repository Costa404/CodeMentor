import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Components/homepage/homepage.component').then(
        (m) => m.HomepageComponent
      ),
  },
  // {
  //   path: 'codeAnalysis/:fileName', // Rota vazia para :username/:repo
  //   loadComponent: () =>
  //     import(
  //       './Components/github-repositories/file-explorer-component/FileExploreService/chat/code-analysis/code-analysis.component'
  //     ).then((m) => m.CodeAnalysisComponent),
  // },
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
        path: '**',
        loadComponent: () =>
          import(
            './Components/github-repositories/file-explorer-component/file-explorer-component.component'
          ).then((m) => m.FileExplorerComponent),
      },
    ],
  },
];
