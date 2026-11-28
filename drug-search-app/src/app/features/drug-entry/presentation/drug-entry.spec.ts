import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DrugRepository } from '../application/ports/drug-repository';
import { DrugEntryComponent } from './drug-entry';

describe('DrugEntry', () => {
  let component: DrugEntryComponent;
  let fixture: ComponentFixture<DrugEntryComponent>;
  let routeId: string | null;

  beforeEach(async () => {
    routeId = '1';
    await TestBed.configureTestingModule({
      imports: [DrugEntryComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => routeId } } },
        },
        {
          provide: DrugRepository,
          useValue: {
            loadAll: () => Promise.resolve([
              { id: 1, name: 'Aspirin', dose: 500, price: 10, quantity: 0 },
              { id: 2, name: 'Ibuprofen', dose: 200, price: 15, quantity: 0 },
              { id: 3, name: 'Paracetamol', dose: 500, price: 8, quantity: 0 },
            ]),
          },
        },
      ],
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

  it('switches between the route-filtered record and all records', () => {
    expect(component.filteredDrugs().map(drug => drug.name)).toEqual(['Aspirin']);

    fixture.nativeElement.querySelector('.drug-entry__view-options button').click();
    fixture.detectChanges();
    expect(component.filteredDrugs().map(drug => drug.name)).toEqual([
      'Aspirin',
      'Ibuprofen',
      'Paracetamol',
    ]);

    fixture.nativeElement.querySelectorAll('.drug-entry__view-options button')[1].click();
    fixture.detectChanges();
    expect(component.filteredDrugs().map(drug => drug.name)).toEqual(['Aspirin']);
  });

  it('shows all records when there is no route ID', async () => {
    routeId = null;
    const allRecordsFixture = TestBed.createComponent(DrugEntryComponent);
    await allRecordsFixture.whenStable();
    allRecordsFixture.detectChanges();

    expect(allRecordsFixture.componentInstance.filteredDrugs()).toHaveLength(3);
    allRecordsFixture.destroy();
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
