import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SonComponent } from './son';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h3>Hello {{ name }}</h3>
    <h4>Hello {{ name }}</h4>
    <button (click)="name = 'Angular'">Reset</button>
    <button (click)="name = 'World'" >Reset to World</button>
    <app-son></app-son>
  `,
  imports: [SonComponent],
})
export class App {
  name = 'World';
}
