import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewMaterialForm } from './view-material-form';

describe('ViewMaterialForm', () => {
  let component: ViewMaterialForm;
  let fixture: ComponentFixture<ViewMaterialForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMaterialForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMaterialForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
