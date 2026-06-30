import { Directive, ViewContainerRef, inject } from '@angular/core';

@Directive({
    selector: '[modalContent]',
    standalone: true
})
export class ModalContentDirective {
  viewContainerRef = inject(ViewContainerRef);
}
