import { Component, Input, SimpleChanges, Output, EventEmitter, input, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { watch } from 'fs';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-drug-card',
  standalone: true,
  styleUrls: ['./drug-card.css'],
  templateUrl: './drug-card.html',
})
export class DrugCardComponent {
  warning = signal<string>(''); 
  @Input() name: string = '';
  @Input() dose: number = 0;
  @Input() price: number = 0;
  @Input() quantity: number = 0;
  @Input() inStock: boolean = true;
  @Output() numberChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() inStockChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnChanges(changes: SimpleChanges) {
  if (changes['price']) {
    console.log('old:', changes['price'].previousValue, 'new:', changes['price'].currentValue);    
  }
  }
  doSales(quantitySold: number) {
   if(this.quantity < quantitySold) {
     this.warning.set('Cannot sell more than available quantity');
     return;
   }
    this.quantity -= quantitySold;
    this.inStock = this.quantity > 0;
    this.stockIt();
  }
  doPurchase(quantityPurchased: number) {
    this.quantity += quantityPurchased;
    this.inStock = this.quantity > 0;
    this.stockIt();
  }
  stockIt() {
    this.inStock = this.quantity > 0;
    this.inStockChange.emit(this.inStock);
    this.numberChange.emit(this.quantity);
  }
  priceIt() {
    this.price += 1;
    this.numberChange.emit(this.price);
  }
}
