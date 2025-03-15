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
    path: ':username/:repo',
    loadComponent: () =>
      import(
        './Components/github-repositories/repoDetails/repo-details.component'
      ).then((m) => m.RepoDetailsComponent),
    children: [
      {
        path: ':path', // Captura subpastas e arquivos dentro do repositório
        loadComponent: () =>
          import(
            './Components/github-repositories/repoDetails/repo-details.component'
          ).then((m) => m.RepoDetailsComponent),
      },
      {
        path: ':path/:file', // Para arquivos (exemplo: /username/repo/src/index.js)
        loadComponent: () =>
          import(
            './Components/github-repositories/repoDetails/monaco-editor/monaco-editor.component'
          ).then((m) => m.MonacoEditorComponent),
      },
    ],
  },
];
