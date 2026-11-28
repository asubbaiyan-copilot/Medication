import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrugDetailsDialog } from './drug-details-dialog';

describe('DrugDetailsDialog', () => {
  let component: DrugDetailsDialog;
  let fixture: ComponentFixture<DrugDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugDetailsDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DrugDetailsDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
