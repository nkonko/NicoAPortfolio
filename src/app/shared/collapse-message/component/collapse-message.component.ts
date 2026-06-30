import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RotateArrowDirective } from '../directive/rotate-arrow.directive';

@Component({
    selector: 'app-collapse-message',
    templateUrl: './collapse-message.component.html',
    styleUrls: ['./collapse-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RotateArrowDirective, NgClass]
})
export class CollapseMessageComponent {
  isCollapsed = true;
  title = input.required<string>();
  paragraph = input.required<string>();

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }
}
