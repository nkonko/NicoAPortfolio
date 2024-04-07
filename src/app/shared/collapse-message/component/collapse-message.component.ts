import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RotateArrowDirective } from '../directive/rotate-arrow.directive';

@Component({
    selector: 'app-collapse-message',
    templateUrl: './collapse-message.component.html',
    styleUrls: ['./collapse-message.component.scss'],
    standalone: true,
    imports: [RotateArrowDirective, NgClass]
})
export class CollapseMessageComponent {
  isCollapsed: boolean = true;
  @Input() title!: string;
  @Input() paragraph!: string;

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

}
