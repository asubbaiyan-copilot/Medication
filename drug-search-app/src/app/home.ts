import { AfterViewInit, Component, computed, effect, inject, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChildCounter } from './features/pharmacys/child-counter/child-counter';
import { MyCounterService } from './features/services/my-counter';
import { NgTemplateOutlet, CommonModule  } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  imports: [ChildCounter, NgTemplateOutlet, CommonModule],
  providers: [MyCounterService]
})
export class HomeComponent implements AfterViewInit{
  newCounter:number = 0;
  loggedIn = false;
  demoCounter = signal(0);

  @ViewChild(ChildCounter)
  private childCounter!: ChildCounter;
  inc(){this.childCounter.increment()}
  dec(){this.childCounter.decrement()}
  counter() {
    return 0;
  }
  incDemo(){
        this.demoCounter.update(value => value + 1);
  }
   
  counterService: MyCounterService = inject(MyCounterService);

  constructor() {
    this.demoCounter.set(1);
    effect(() => console.log(this.demoCounter()));
    this.counterService.counter$.subscribe(counter => {
      this.newCounter  = counter;
    }); 
  }
  incNew(){
    this.counterService.increment(this.newCounter);
  }
  decNew(){
    this.counterService.decrement(this.newCounter);
  }
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
   ngAfterViewInit() {
      setTimeout(() => this.counter = () => this.childCounter.childCounter(), 0)
   }
}
