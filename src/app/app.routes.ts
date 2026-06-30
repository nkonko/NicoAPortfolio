import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'about',
    loadChildren: () => import('./modules/about/about.routes').then(m => m.ABOUT_ROUTES)
  },
  {
    path: 'experience',
    loadChildren: () => import('./modules/experience/experience.routes').then(m => m.EXPERIENCE_ROUTES)
  },
  {
    path: 'skills',
    loadChildren: () => import('./modules/skills/skills.routes').then(m => m.SKILLS_ROUTES)
  },
  {
    path: 'repos',
    loadChildren: () => import('./modules/repos/repos.routes').then(m => m.REPOS_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];