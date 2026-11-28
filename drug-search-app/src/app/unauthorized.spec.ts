import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { routes } from './app.routes';
import { DrugRepository } from './features/drug-entry/application/ports/drug-repository';
import { DrugEntryComponent } from './features/drug-entry/presentation/drug-entry';
import { HomeComponent } from './home';
import { UnauthorizedComponent } from './unauthorized';

describe('unauthorized route', () => {
  it('redirects a guarded route to the access denied page', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/entry/123', UnauthorizedComponent);

    expect(TestBed.inject(Router).url).toBe('/unauthorized');
    expect(harness.routeNativeElement?.textContent).toContain('Access denied');
    expect(harness.routeNativeElement?.querySelector('a[href="/"]')).not.toBeNull();
    expect(harness.routeNativeElement?.querySelector('a[href="/entry"]')).not.toBeNull();
  });

  it('uses the home login toggle to allow and deny access', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        { provide: DrugRepository, useValue: { loadAll: () => Promise.resolve([]) } },
        { provide: MatSnackBar, useValue: { open: () => {} } },
      ],
    });

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', HomeComponent);
    const toggle = () => {
      const buttons = Array.from(harness.routeNativeElement!.querySelectorAll('button'));
      const button = buttons.find(item => item.textContent?.includes('Toggle Login'));
      expect(button).toBeDefined();
      button!.click();
      harness.detectChanges();
    };

    expect(harness.routeNativeElement?.textContent).toContain('You are not logged in.');
    toggle();
    expect(harness.routeNativeElement?.textContent).toContain('Welcome, you are logged in!');
    await harness.navigateByUrl('/entry/123', DrugEntryComponent);
    expect(TestBed.inject(Router).url).toBe('/entry/123');

    await harness.navigateByUrl('/', HomeComponent);
    expect(harness.routeNativeElement?.textContent).toContain('Welcome, you are logged in!');
    toggle();
    await harness.navigateByUrl('/entry/123', UnauthorizedComponent);
    expect(TestBed.inject(Router).url).toBe('/unauthorized');
  });
});
