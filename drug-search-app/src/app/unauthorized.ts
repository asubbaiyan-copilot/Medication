import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [RouterLink],
  template: `
    <main class="unauthorized">
      <h1>Access denied</h1>
      <p>You do not have access to this page.</p>
      <p>Return to the home page or view the drug inventory instead.</p>
      <div class="unauthorized__actions">
        <a routerLink="/">Go to home</a>
        <a routerLink="/entry">View drug inventory</a>
      </div>
    </main>
  `,
  styles: `
    .unauthorized {
      max-width: 36rem;
      margin: 3rem auto;
      padding: 2rem;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      text-align: center;
    }

    .unauthorized__actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .unauthorized__actions a {
      padding: .75rem 1rem;
      border-radius: 8px;
      background: #2563eb;
      color: white;
      text-decoration: none;
    }

    .unauthorized__actions a:focus-visible {
      outline: 3px solid #1e40af;
      outline-offset: 3px;
    }
  `,
})
export class UnauthorizedComponent {}
