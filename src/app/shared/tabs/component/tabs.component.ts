import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Tab } from '../model/tab';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: true,
    imports: []
})
export class TabsComponent implements AfterViewInit, OnChanges {
  @Input() tabs!: Tab[];
  @Output() selectedTab = new EventEmitter<string>();
  @Input() activeTab!: string;
  @ViewChild('tabsList') tabsList?: ElementRef<HTMLUListElement>;
  
  showLeftArrow = false;
  showRightArrow = false;
  get showScrollButtons(): boolean {
    return this.showLeftArrow || this.showRightArrow;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    // Los tabs se cargan async — cuando llegan, hay que re-checkear el scroll
    if (changes['tabs'] && changes['tabs'].currentValue?.length > 0) {
      setTimeout(() => {
        this.checkScroll();
        this.cdr.detectChanges();
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkScroll();
      this.cdr.detectChanges();
    });
  }

  onTabClick(name: string) {
    this.activeTab = name;
    this.selectedTab.emit(name);
  }

  scrollTabs(direction: 'left' | 'right') {
    const ul = this.tabsList?.nativeElement;
    if (!ul) return;

    // Scrollea casi un viewport completo (menos 60px de solapamiento)
    // Así cada click revela tabs nuevas sin perder contexto
    const scrollAmount = ul.clientWidth - 60;
    const targetScroll = direction === 'left' 
      ? ul.scrollLeft - scrollAmount 
      : ul.scrollLeft + scrollAmount;

    ul.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    // Esperar que termine la animación antes de reevaluar flechas
    setTimeout(() => {
      this.checkScroll();
      this.cdr.detectChanges();
    }, 400);
  }

  private checkScroll() {
    const ul = this.tabsList?.nativeElement;
    if (!ul) return;

    const { scrollLeft, scrollWidth, clientWidth } = ul;
    
    this.showLeftArrow = scrollLeft > 0;
    this.showRightArrow = scrollLeft + clientWidth < scrollWidth - 10;
  }

  onScroll() {
    this.checkScroll();
    this.cdr.detectChanges();
  }
}
