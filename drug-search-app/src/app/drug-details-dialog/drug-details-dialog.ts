import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Drug } from '../features/pharmacys/domain/drug';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [CommonModule, MatDialogModule, MatIconModule],
  selector: 'app-drug-details-dialog',
  styleUrls: ['./drug-details-dialog.css'],
  templateUrl: './drug-details-dialog.html',
})
export class DrugDetailsDialog {

    readonly drug = inject<Drug>(MAT_DIALOG_DATA);
    

}
