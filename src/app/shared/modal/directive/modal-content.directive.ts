import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[modalContent]',
    standalone: true
})
export class ModalContentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
