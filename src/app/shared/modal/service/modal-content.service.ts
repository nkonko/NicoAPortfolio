import { Injectable } from '@angular/core';
import type { Type as Component } from '@angular/core';
import { ModalContentDirective } from '../directive/modal-content.directive';

@Injectable({
  providedIn: 'root'
})
export class ModalContentService {
  #contentArea?: ModalContentDirective;
  #stack = [] as Component<unknown>[];

  constructor() { }

  #setContent(component: Component<unknown>): void {
    this.#contentArea?.viewContainerRef.clear();

    this.#contentArea?.viewContainerRef.createComponent(component);
  }

  async push(component: Component<unknown>): Promise<void> {
    this.#stack.push(component);

    this.#setContent(component);
  }

  async pop(): Promise<void> {
    if (this.#stack.length === 1) {
      return;
    }

    this.#stack.pop();

    this.#setContent(this.#lastStackItem);
  }

  get #lastStackItem(): Component<unknown> {
    return this.#stack[this.#stack.length - 1];
  }

  setDynamicContentArea(host: ModalContentDirective) {
    this.#contentArea = host;
  }

}
