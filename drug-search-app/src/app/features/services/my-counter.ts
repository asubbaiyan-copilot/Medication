import { Subject } from 'rxjs/internal/Subject';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyCounterService {
   constructor() {}
   private counterSource = new Subject<number>();
   public counter$ = this.counterSource.asObservable();

   increment(val:number) {
     this.counterSource.next(val +1);
   }

   decrement(val:number) {
     this.counterSource.next(val -1);
   }



}
