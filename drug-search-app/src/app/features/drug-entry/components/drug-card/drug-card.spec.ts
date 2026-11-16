import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrugCardComponent } from './drug-card';

describe('DrugCard', () => {
  let component: DrugCardComponent;
  let fixture: ComponentFixture<DrugCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DrugCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates quantity and stock, and rejects an oversell', () => {
    const quantities: number[] = [];
    component.quantityChange.subscribe(value => quantities.push(value));
    component.quantity = 1;
    component.doSales(1);
    expect(component.quantity).toBe(0);
    expect(component.inStock).toBe(false);
    component.doSales(1);
    expect(component.warning()).toBe('Cannot sell more than available quantity');
    expect(component.quantity).toBe(0);
    component.doPurchase(2);
    expect(component.quantity).toBe(2);
    expect(component.inStock).toBe(true);
    expect(quantities).toEqual([0, 2]);
  });

  it('updates price and displays the total', async () => {
    const values: number[] = [];
    component.priceChange.subscribe(value => values.push(value));
    fixture.componentRef.setInput('quantity', 3);
    fixture.componentRef.setInput('price', 4);
    await fixture.whenStable();
    const buttons: NodeListOf<HTMLButtonElement> = fixture.nativeElement.querySelectorAll('button');
    buttons[buttons.length - 1].click();
    await fixture.whenStable();
    expect(values).toEqual([5]);
    expect(fixture.nativeElement.textContent).toContain('Total: 15');
  });
});
