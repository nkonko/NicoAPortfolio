import { Directive, HostBinding, HostListener, DoCheck, ContentChild } from '@angular/core';

@Directive({
    selector: '.navbar-burger',
    standalone: true
})
export class BurgerDirective {

  @HostBinding('class.is-active')
  isOpen = false;

  @HostListener('click')
  toggleBurger() {
    this.isOpen = ! this.isOpen;
  }

}

@Directive({
    selector: '.navbar-menu',
    standalone: true
})
export class MenuDirective {

  @HostBinding('class.is-active')
  isActive: boolean = false;

}

@Directive({
    selector: '.navbar',
    standalone: true
})
export class NavbarDirective implements DoCheck {

  @ContentChild(BurgerDirective)
  burger!: BurgerDirective;

  @ContentChild(MenuDirective)
  menu!: MenuDirective;

  ngDoCheck() {
    if (this.burger){
        this.menu.isActive = this.burger.isOpen;
    }
  }
}
