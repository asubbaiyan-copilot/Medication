import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { DrugService } from '../../services/drug.service';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-drug-card',
  standalone: true,
  styleUrls: ['./drug-card.css'],
  templateUrl: './drug-card.html',
})
export class DrugCardComponent implements OnChanges {
  warning = signal('');
  private warnTimer?: ReturnType<typeof setTimeout>;

  @Input() name = '';
  @Input() dose = 0;
  @Input() price = 0;
  @Input() quantity = 0;

  @Output() quantityChange = new EventEmitter<number>();
  @Output() priceChange = new EventEmitter<number>();

  constructor(private drugService: DrugService) {}

  get inStock(): boolean {
    return this.drugService.isInStock(this.quantity);
  }

  get totalPrice(): number {
    return this.drugService.totalPrice(this.price, this.quantity);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['price']) {
      console.log('old:', changes['price'].previousValue, 'new:', changes['price'].currentValue);
    }
  }

  doSales(qty: number) {
    const newQty = this.drugService.sell(this.quantity, qty);
    if (newQty === null) {
      this.showWarning('Cannot sell more than available quantity');
      return;
    }
    this.warning.set('');
    this.updateQuantity(newQty);
  }

  doPurchase(qty: number) {
    this.warning.set('');
    this.updateQuantity(this.drugService.purchase(this.quantity, qty));
  }

  priceIt() {
    this.price = this.drugService.increasePrice(this.price);
    this.priceChange.emit(this.price);
  }

  updateQuantity(q: number) {
    this.quantity = q;
    this.quantityChange.emit(q);
  }

  private showWarning(msg: string) {
    this.warning.set(msg);
    clearTimeout(this.warnTimer);
    this.warnTimer = setTimeout(() => this.warning.set(''), 3000);
  }
}