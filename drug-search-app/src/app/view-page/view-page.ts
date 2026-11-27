import { Component, inject, AfterViewInit, ViewChild, effect } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { PharmacyServices } from '../features/pharmacys/services/pharmacy-services';
import { Drug } from '../features/pharmacys/domain/drug';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort,MatSortModule  } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
 
@Component({
    imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatSnackBarModule ],
    selector: 'app-view-page',
    styleUrls: ['./view-page.css']  ,
    templateUrl: './view-page.html',
})
export class ViewPage implements AfterViewInit {
   private readonly pharmacyServices = inject(PharmacyServices);
   tableData = new MatTableDataSource<Drug>();
   displayedColumns: string[] = [
    'id',
    'name',
    'dose',
    'price',
    'quantity'
  ];
  private readonly snackBar = inject(MatSnackBar);
   readonly drug = inject<Drug>(MAT_DIALOG_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
 
constructor() {
  effect(() => {
    this.tableData.data = [...this.pharmacyServices.drugs()];
    console.log('Initial Drugs:', this.tableData.data);
  }) ;
  
}
   
  ngAfterViewInit() : void {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
    if (this.tableData.filteredData.length === 0) {
      this.snackBar.open('No matching drugs found', 'Close', {
        duration: 1000,
      });
    }
  }
}
