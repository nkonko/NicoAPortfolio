import { Component, Input } from '@angular/core';
import { Tab } from '../model/tab';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @Input() tabs!: Tab[] ;
}
