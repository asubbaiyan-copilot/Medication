import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-in-out-child-sample',
  styleUrl: './in-out-child-sample.css',
  templateUrl: './in-out-child-sample.html',
})
export class InOutChildSample {
  @Input() caption: string = '';
  @Input() counter: number = 0;
  
  @Output() counterChangeEvent = new EventEmitter<number>();
  passCounterChange(): void {
    this.counterChangeEvent.emit(this.counter);
  }

  @Input() set counterValue(value: number) {
    this.counter = value;
  }
  get counterValue(): number {
    return this.counter;
  }
}
