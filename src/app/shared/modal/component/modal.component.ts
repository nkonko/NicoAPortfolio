import { Component, input, output, ViewChild, AfterViewInit, ChangeDetectionStrategy, signal, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ModalContentDirective } from '../directive/modal-content.directive';
import { ModalContentService } from '../service/modal-content.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ModalContentDirective]
})
export class ModalComponent implements AfterViewInit {
  isActive = input(false);
  reset = output<boolean>();
  @ViewChild(ModalContentDirective, { static: true }) modalContentArea?: ModalContentDirective;

  private modalContentService = inject(ModalContentService);
  private isOpen = toSignal(this.modalContentService.toggle$);

  /** Estado combinado: arranca del input del padre y reacciona al servicio */
  protected _active = signal(false);

  constructor() {
    // Sincronizar desde el padre
    effect(() => this._active.set(this.isActive()));

    // Reaccionar a cierres externos (servicio)
    effect(() => {
      if (this.isOpen() !== undefined) {
        this._active.set(false);
        this.reset.emit(false);
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.modalContentArea) {
      throw new Error('modalContentArea is undefined');
    }

    this.modalContentService.setDynamicContentArea(this.modalContentArea);
  }

  close(): void {
    this._active.set(false);
    this.reset.emit(false);
  }
}
