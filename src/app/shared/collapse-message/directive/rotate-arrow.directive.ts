import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '.rotate',
    standalone: true
})
export class RotateArrowDirective {
  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {

    target.classList.toggle('rotate');
  }

}
