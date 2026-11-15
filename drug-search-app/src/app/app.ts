import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive, } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  canShow = signal(true);
  // signal are reactive state variables in Angular that can be used to track and react to changes in their values.
  // They are similar to observables but are simpler to use for local component state.  
  protected readonly titleSignal = signal('I am the initial title');
  firstname = signal('John');
  lastname = signal('Doe');
  tips = signal('This is a tooltip message');
  fullName = computed(() => `${this.firstname()} ${this.lastname()}`);
  changeTitle() {
    this.titleSignal.set('The title has been changed');
  }
  toggleTooltip() {
    this.canShow.set(!this.canShow());
  }
}
