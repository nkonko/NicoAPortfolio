import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '.rotate'
})
export class RotateArrowDirective {
  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {

    target.classList.toggle('rotate');
  }

}
