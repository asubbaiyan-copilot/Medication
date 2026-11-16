import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrugEntry } from './drug-entry';

describe('DrugEntry', () => {
  let component: DrugEntry;
  let fixture: ComponentFixture<DrugEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugEntry],
    }).compileComponents();

    fixture = TestBed.createComponent(DrugEntry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
