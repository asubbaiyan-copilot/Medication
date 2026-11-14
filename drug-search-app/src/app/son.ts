import { Component } from '@angular/core';

@Component({
	selector: 'app-son',
	standalone: true,
	template: `
	 <p>Hello {{ name }}</p>
		<img [src]="url" (error)="onMissing()">
		<input #box (input)="save(box.value)">
		@for (item of items; track $index) {
			<li>{{ $index }}. {{ item }}</li>
		}
			`,
	styles: [
		`
			.son {
				padding: 1rem;
			}
		`,
	],
})
/**
 * This is the SonComponent class that handles the display and interaction of the son component.
 */
export class SonComponent {
  name = 'World';
  url = 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA2bX9yP.img?w=768&h=512&m=6';
  items = ['Item 1', 'Item 2', 'Item 3'];

  onMissing() {
    this.url = 'https://via.placeholder.com/150';
  }

  save(value: string) {
    this.items.push(value);
  }
}
