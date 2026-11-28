import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPharmacySearchComponent } from './view-pharmacy-search-component';

describe('ViewPharmacySearchComponent', () => {
  let component: ViewPharmacySearchComponent;
  let fixture: ComponentFixture<ViewPharmacySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPharmacySearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPharmacySearchComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
