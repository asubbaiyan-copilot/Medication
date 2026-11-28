import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-child-counter',
  styleUrls: ['./child-counter.css'],
  templateUrl: './child-counter.html',
})
export class ChildCounter {
  childCounter = signal(0);
  
  increment() {
    this.childCounter.set(this.childCounter() + 1);
  }

  decrement() {
    if (this.childCounter() > 0) {
      this.childCounter.set(this.childCounter() - 1);
    }
  }

}
