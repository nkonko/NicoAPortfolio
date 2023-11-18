import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
 {
  path: 'about',
  loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)
 },
 {
  path: 'experience',
  loadChildren: () => import('./modules/experience/experience.module').then(m => m.ExperienceModule)
 },
 {
  path: 'skills',
  loadChildren: () => import('./modules/skills/skills.module').then(m => m.SkillsModule)
 },
 { path: '**', redirectTo: 'not-found'}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
