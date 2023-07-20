import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[modalContent]'
})
export class ModalContentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
