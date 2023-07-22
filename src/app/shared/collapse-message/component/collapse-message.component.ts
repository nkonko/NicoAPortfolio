import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapse-message',
  templateUrl: './collapse-message.component.html',
  styleUrls: ['./collapse-message.component.scss']
})
export class CollapseMessageComponent {
  isCollapsed: boolean = true;
  @Input() title!: string;
  @Input() paragraph!: string;

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

}
