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
import { CollapseMessageComponent } from './collapse-message/component/collapse-message.component';
import { RotateArrowDirective } from './collapse-message/directive/rotate-arrow.directive';
import { SkillBoxComponent } from './skill-box/component/skill-box.component';
import { TabsComponent } from './tabs/component/tabs.component';
import { SkillBoxesComponent } from './skill-boxes/component/skill-boxes.component';



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
    CollapseMessageComponent,
    RotateArrowDirective,
    SkillBoxComponent,
    TabsComponent,
    SkillBoxesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ModalComponent,
    SplashComponent,
    CollapseMessageComponent,
    SkillBoxComponent,
    TabsComponent,
    SkillBoxesComponent
  ]
})
export class SharedModule { }
