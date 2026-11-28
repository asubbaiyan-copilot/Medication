import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  imports: [MatMenuModule, MatIconModule, MatButtonModule],
  selector: 'app-view-menu',
  styleUrls: ['./view-menu.css'],
  templateUrl: './view-menu.html',
})
export class ViewMenu {}
