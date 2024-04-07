import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ModalContentDirective } from '../directive/modal-content.directive';
import { ModalContentService } from '../service/modal-content.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    standalone: true,
    imports: [ModalContentDirective]
})
export class ModalComponent implements OnInit, OnDestroy {
  isOpen$ = this.modalContentService.toggle$;
  @Input() isActive!: boolean;
  @Output() reset = new EventEmitter<boolean>();
  @ViewChild(ModalContentDirective, { static: true }) modalContentArea?: ModalContentDirective;

  constructor(private modalContentService: ModalContentService) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    if (!this.modalContentArea) {
      throw new Error('modalContentArea is undefined');
    }

    this.modalContentService.setDynamicContentArea(this.modalContentArea);

    this.isOpen$.subscribe(val => {
      this.isActive = val;
      this.reset.emit(false);
    })
  }

  close() {
    this.isActive = !this.isActive;
    this.reset.emit(false);
  }

}
