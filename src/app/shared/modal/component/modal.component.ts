import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalContentDirective } from '../directive/modal-content.directive';
import { ModalContentService } from '../service/modal-content.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild(ModalContentDirective, { static: true }) modalContentArea?: ModalContentDirective;

  constructor(private modalContentService: ModalContentService) { }

  ngOnInit(): void {

    if (!this.modalContentArea) {
      throw new Error('modalContentArea is undefined');
    }

    this.modalContentService.setDynamicContentArea(this.modalContentArea);
  }

}