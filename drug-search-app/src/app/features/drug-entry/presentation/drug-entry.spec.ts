import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrugRepository } from '../application/ports/drug-repository';
import { DrugEntryComponent } from './drug-entry';

describe('DrugEntry', () => {
  let component: DrugEntryComponent;
  let fixture: ComponentFixture<DrugEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugEntryComponent],
      providers: [{
        provide: DrugRepository,
        useValue: {
          loadAll: () => Promise.resolve([
            { name: 'Aspirin', dose: 500, price: 10, quantity: 0 },
            { name: 'Ibuprofen', dose: 200, price: 15, quantity: 0 },
            { name: 'Paracetamol', dose: 500, price: 8, quantity: 0 },
          ]),
        },
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(DrugEntryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('raises every drug price', () => {
    component.raisePrice();
    expect(component.drugs().map(drug => drug.price)).toEqual([11, 16, 9]);
  });

  it('keeps card changes in the list when prices are raised', async () => {
    const firstCard: HTMLElement = fixture.nativeElement.querySelector('app-drug-card');
    const buttons = firstCard.querySelectorAll('button');
    buttons[1].click();
    buttons[buttons.length - 1].click();
    await fixture.whenStable();

    expect(component.drugs()[0].quantity).toBe(1);
    expect(component.drugs()[0].price).toBe(11);
    component.raisePrice();
    await fixture.whenStable();
    expect(component.drugs()[0].price).toBe(12);
    expect(firstCard.textContent).toContain('Total: 12');
  });
});
