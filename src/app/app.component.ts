import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  protected modalActive: boolean = false;

  toggleActivation() {
    this.modalActive = !this.modalActive;

  }
}
