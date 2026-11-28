import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveForm } from './reactive-form';

describe('ReactiveForm', () => {
  let component: ReactiveForm;
  let fixture: ComponentFixture<ReactiveForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an error for an invalid touched control', () => {
    const control = component.formdata.get('userName');

    control?.markAsTouched();

    expect(component.shouldShowError('userName')).toBe(true);
  });

  it('should not show an error for an invalid untouched control', () => {
    expect(component.shouldShowError('userName')).toBe(false);
  });

  it('should not show an error for a valid touched control', () => {
    const control = component.formdata.get('userName');

    control?.setValue('Alice');
    control?.markAsTouched();

    expect(component.shouldShowError('userName')).toBe(false);
  });

  it('should not show an error for an unknown control', () => {
    expect(component.shouldShowError('unknown')).toBe(false);
  });
});
