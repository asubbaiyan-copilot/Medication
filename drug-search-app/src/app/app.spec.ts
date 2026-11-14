import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the greeting', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Hello World');
  });
  it('should render the greeting', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Hello World');
  });

  it('should update the greeting when reset is clicked', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelectorAll('button')[0]!.click();
    await fixture.whenStable();
    expect(compiled.querySelector('h4')?.textContent).toContain('Hello Angular');
    
    compiled.querySelectorAll('button')[1]!.click();
    await fixture.whenStable();
    expect(compiled.querySelector('h4')?.textContent).toContain('Hello World');
    compiled.querySelector('button')!.click();
    await fixture.whenStable();
    expect(compiled.querySelector('h4')?.textContent).toContain('Hello Angular');
  });
});
