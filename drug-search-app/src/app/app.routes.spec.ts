import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('app navigation', () => {
  it('loads drugs on navigation and removes them when returning home', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)]
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('app-home')?.textContent).toContain('Welcome to Drug Search');
    expect(fixture.nativeElement.querySelector('app-drugs')).toBeNull();

    await router.navigateByUrl('/drugs');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('app-home')).toBeNull();
    expect(fixture.nativeElement.querySelector('app-drugs')).not.toBeNull();

    await router.navigateByUrl('/entry');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('app-drugs')).toBeNull();
    expect(fixture.nativeElement.querySelector('app-drug-entry')?.textContent).toContain('Aspirin');

    await router.navigateByUrl('/');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('app-home')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('app-drugs')).toBeNull();
  });
});
