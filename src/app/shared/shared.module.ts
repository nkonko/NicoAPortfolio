import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/component/navbar/navbar.component';
import { FooterComponent } from './layout/footer/component/footer/footer.component';
import { RouterModule } from '@angular/router';
import { BurgerDirective, MenuDirective, NavbarDirective } from './layout/navbar/directive/navbar.directive';
import { ModalComponent } from './modal/component/modal.component';
import { ModalContentDirective } from './modal/directive/modal-content.directive';
import { ModalOpenDirective } from './modal/directive/modal-open.directive';
import { SplashComponent } from './splash/component/splash.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NavbarDirective,
    BurgerDirective,
    MenuDirective,
    ModalComponent,
    ModalContentDirective,
    ModalOpenDirective,
    SplashComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ModalComponent,
    SplashComponent
  ]
})
export class SharedModule { }
