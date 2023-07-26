import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tab } from '../model/tab';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tabs!: Tab[];
  @Output() selectedTab = new EventEmitter<string>();
  protected activeTab: string = 'Languaje';

  ngOnInit(): void {
    this.selectedTab.emit(this.activeTab);
  }

  onTabClick(name: string) {
    this.selectedTab.emit(name);
    this.activeTab = name;
  }
}
