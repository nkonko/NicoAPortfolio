import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { Tab } from '../model/tab';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true
})
export class TabsComponent {
  @Input() tabs!: Tab[];
  @Output() selectedTab = new EventEmitter<string>();
  @Input() activeTab!: string;

  onTabClick(name: string) {
    this.activeTab = name;
    this.selectedTab.emit(name);
  }
}
