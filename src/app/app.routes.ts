import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./modules/home/components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./modules/about/components/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./modules/experience/components/experience/experience.component').then(m => m.ExperienceComponent)
  },
  {
    path: 'skills',
    loadChildren: () => import('./modules/skills/skills.routes').then(m => m.SKILLS_ROUTES)
  },
  {
    path: 'repos',
    loadComponent: () =>
      import('./modules/repos/components/repos/repos.component').then(m => m.ReposComponent)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];