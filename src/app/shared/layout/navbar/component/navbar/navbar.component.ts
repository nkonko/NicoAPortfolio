import { Component, OnInit, ChangeDetectionStrategy, inject, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { NavbarDirective, BurgerDirective, MenuDirective } from '../../directive/navbar.directive';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgClass, NavbarDirective, RouterLink, BurgerDirective, MenuDirective, RouterLinkActive, TranslocoModule]
})
export class NavbarComponent implements OnInit {

  @ViewChild(BurgerDirective) private burger?: BurgerDirective;

  theme: 'light' | 'dark' = 'light';
  private transloco = inject(TranslocoService);
  private router = inject(Router);
  protected currentLang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });

  ngOnInit(): void {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.theme = 'dark';
      this.applyTheme('dark');
    }

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.burger) this.burger.isOpen = false;
      });
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.theme);
    localStorage.setItem('theme', this.theme);
  }

  toggleLang(): void {
    const newLang = this.currentLang() === 'en' ? 'es' : 'en';
    this.transloco.setActiveLang(newLang);
    localStorage.setItem('lang', newLang);
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

}
