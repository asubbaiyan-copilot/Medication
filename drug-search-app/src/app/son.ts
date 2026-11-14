import { Component } from '@angular/core';
@Component({
	selector: 'app-son',
	standalone: true,
	template: `
	 <p>Hello {{ name }}</p>
	 <p>Current: {{ current }}</p>
		<img [src]="url" (error)="onMissing()">
		<input #boxe type="text" placeholder="Type something" (input)="current = boxe.value" />
		 <button (click)="read(boxe.value)">read({{ boxe.value }})</button>
		  <span style="margin-left:8px;color:#666">length={{ boxe.value?.length || 0 }}</span>
		<input #box (input)="save(box.value)">
		@for (item of items; track $index) {
			<li>{{ $index }}. {{ item }}</li>
		}
		<p>Items count: {{ items.length }} {{country.toUpperCase()}}</p>
		<p> Country: {{ country.toUpperCase() }} </p>
		<p> Country: {{ 1 + 2 }} </p> 
		<button (click)="save('New Item')">Add Item</button>
		<button (click)="box.focus(); items.pop()">focus Last Item</button>
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
  current = '';
  name = 'World';
  url = 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA2bX9yP.img?w=768&h=512&m=6';
  items = ['Item 1', 'Item 2', 'Item 3'];
  country = 'us';

  onMissing() {
    this.url = 'https://via.placeholder.com/150';
  }

  save(value: string) {
    this.items.push(value);
  }
  read(value: string) {
    this.current = value;
  }
}
