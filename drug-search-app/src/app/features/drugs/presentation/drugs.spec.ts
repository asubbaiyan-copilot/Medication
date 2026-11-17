import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrugsComponent } from './drugs';

describe('DrugsComponent', () => {
  let fixture: ComponentFixture<DrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugsComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DrugsComponent);
    await fixture.whenStable();
  });

  it('enables adding only when all fields contain text and disables again after adding', async () => {
    const element: HTMLElement = fixture.nativeElement;
    const inputs = element.querySelectorAll<HTMLInputElement>('input');
    const button = element.querySelector<HTMLButtonElement>('.btn-add')!;

    expect(button.disabled).toBe(true);

    for (const [index, value] of ['Aspirin', '500mg', 'Daily', '   '].entries()) {
      inputs[index].value = value;
      inputs[index].dispatchEvent(new Event('input'));
    }
    await fixture.whenStable();
    expect(button.disabled).toBe(true);

    inputs[3].value = 'Tablet';
    inputs[3].dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(button.disabled).toBe(false);

    button.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.drugs()).toHaveLength(1);
    expect(button.disabled).toBe(true);
  });
});
