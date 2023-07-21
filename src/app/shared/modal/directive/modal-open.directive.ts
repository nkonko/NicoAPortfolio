import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({selector: '.fab'})
export class ModalOpenDirective {

  // @HostBinding('class.is-active')
  // isOpen = false;

  // @HostListener('click')
  // toggle() {
  //   this.isOpen = !this.isOpen;
  // }

}
