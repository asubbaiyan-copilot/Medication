import { Component, computed, signal, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
   // signal are reactive state variables in Angular that can be used to track and react to changes in their values.
  // They are similar to observables but are simpler to use for local component state.  
  protected readonly titleSignal = signal('I am the initial title');
  firstname = signal('John');
  lastname = signal('Doe');
  tips = signal('This is a tooltip message');
  fullName = computed(() => `${this.firstname()} ${this.lastname()}`);
  canShow = signal(true);
  changeTitle() {
    this.titleSignal.set('The title has been changed');
  }
  toggleTooltip() {
    this.canShow.set(!this.canShow());
  }
}
