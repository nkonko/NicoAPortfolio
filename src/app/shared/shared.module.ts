import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/component/navbar/navbar.component';
import { FooterComponent } from './layout/footer/component/footer/footer.component';
import { RouterModule } from '@angular/router';
import { BurgerDirective, MenuDirective, NavbarDirective } from './layout/navbar/directive/navbar.directive';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NavbarDirective,
    BurgerDirective,
    MenuDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
