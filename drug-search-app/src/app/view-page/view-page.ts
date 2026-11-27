import { Component, inject, AfterViewInit, ViewChild, effect } from '@angular/core';
import { PharmacyServices } from '../features/pharmacys/services/pharmacy-services';
import { Drug } from '../features/pharmacys/domain/drug';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort,MatSortModule  } from '@angular/material/sort';
 
@Component({
    imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
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
}
