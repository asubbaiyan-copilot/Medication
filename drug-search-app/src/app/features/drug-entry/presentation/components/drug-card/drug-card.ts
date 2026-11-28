import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, input, Input, Output, signal } from '@angular/core';
import { increasePrice, isInStock, purchase, sell, totalPrice } from '../../../domain/drug-rules';
 
@Component({
  imports: [CurrencyPipe],
  selector: 'app-drug-card',
  standalone: true,
  styleUrls: ['./drug-card.css'],
  templateUrl: './drug-card.html',
})
export class DrugCardComponent {
  warning = signal('');
  private warnTimer?: ReturnType<typeof setTimeout>;

 
  @Input() id = '';
  @Input() name = '';
  @Input() dose = 0;
  @Input() price = 0;
  @Input() quantity = 0;

  @Output() quantityChange = new EventEmitter<number>();
  @Output() priceChange = new EventEmitter<number>();

  get inStock(): boolean {
    return isInStock(this.quantity);
  }

  get totalPrice(): number {
    return totalPrice(this.price, this.quantity);
  }

  doSales(qty: number): void {
    const newQuantity = sell(this.quantity, qty);
    if (newQuantity === null) {
      this.showWarning('Cannot sell more than available quantity');
      return;
    }

    this.warning.set('');
    this.updateQuantity(newQuantity);
  }

  doPurchase(qty: number): void {
    this.warning.set('');
    this.updateQuantity(purchase(this.quantity, qty));
  }

  priceIt(): void {
    this.price = increasePrice(this.price);
    this.priceChange.emit(this.price);
  }

  updateQuantity(quantity: number): void {
    this.quantity = quantity;
    this.quantityChange.emit(quantity);
  }

  private showWarning(message: string): void {
    this.warning.set(message);
    clearTimeout(this.warnTimer);
    this.warnTimer = setTimeout(() => this.warning.set(''), 3000);
  }
}
