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

  ngOnInit(): void {
    this.selectedTab.emit('Languaje');
  }

  onTabClick(name: string) {
    this.selectedTab.emit(name);
  }
}
