import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarDirective, BurgerDirective, MenuDirective } from '../../directive/navbar.directive';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgClass, NavbarDirective, RouterLink, BurgerDirective, MenuDirective, RouterLinkActive]
})
export class NavbarComponent implements OnInit {

  theme: 'light' | 'dark' = 'light';

  ngOnInit(): void {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'dark') {
      this.theme = 'dark';
    }
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.theme);
    localStorage.setItem('theme', this.theme);
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

}
