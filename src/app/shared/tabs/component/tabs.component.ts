import { Component, input, output, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, signal, computed, effect } from '@angular/core';
import { Tab } from '../model/tab';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class TabsComponent implements AfterViewInit {
  tabs = input.required<Tab[]>();
  activeTab = input.required<string>();
  selectedTab = output<string>();

  @ViewChild('tabsList') tabsList?: ElementRef<HTMLUListElement>;

  protected localActiveTab = signal('');
  protected showLeftArrow = signal(false);
  protected showRightArrow = signal(false);
  protected showScrollButtons = computed(() => this.showLeftArrow() || this.showRightArrow());

  constructor() {
    effect(() => {
      this.localActiveTab.set(this.activeTab());
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.checkScroll());
  }

  onTabClick(name: string) {
    this.localActiveTab.set(name);
    this.selectedTab.emit(name);
  }

  scrollTabs(direction: 'left' | 'right') {
    const ul = this.tabsList?.nativeElement;
    if (!ul) return;

    const scrollAmount = ul.clientWidth - 60;
    ul.scrollTo({
      left: direction === 'left' ? ul.scrollLeft - scrollAmount : ul.scrollLeft + scrollAmount,
      behavior: 'smooth'
    });

    setTimeout(() => this.checkScroll(), 400);
  }

  private checkScroll() {
    const ul = this.tabsList?.nativeElement;
    if (!ul) return;

    this.showLeftArrow.set(ul.scrollLeft > 0);
    this.showRightArrow.set(ul.scrollLeft + ul.clientWidth < ul.scrollWidth - 10);
  }

  onScroll() {
    this.checkScroll();
  }
}
