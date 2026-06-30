import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReposComponent } from './components/repos/repos.component';

const routes: Routes = [
  { path: '', component: ReposComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReposRoutingModule { }
