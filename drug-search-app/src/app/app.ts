import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive, } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  titleSignal = signal('I am the initial title');
}
