import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarDirective, BurgerDirective, MenuDirective } from '../../directive/navbar.directive';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NavbarDirective, RouterLink, BurgerDirective, MenuDirective, RouterLinkActive]
})
export class NavbarComponent {



}
