import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormArray } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

interface MaterialRow {
  material: string;
  quantity: string;
}

type MaterialFormGroup = FormGroup<{
  material: FormControl<string>;
  quantity: FormControl<string>;
}>;

@Component({
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatTableModule],
  selector: 'app-view-material-form',
  styleUrls: ['./view-material-form.css'] ,
  templateUrl: './view-material-form.html',
})
export class ViewMaterialForm implements OnInit {
  form = new FormGroup({
    material: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required,Validators.min(1),Validators.pattern("^[0-9]*$")]),
    email: new FormControl('',[Validators.required, Validators.email]),
    materialType: new FormControl('', [Validators.required]),
    agree: new FormControl(false, [Validators.requiredTrue]),
    agreementDate: new FormControl<Date | null>(new Date(), [Validators.required]),
    materials : new FormArray<MaterialFormGroup>([
      new FormGroup({
        material: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        quantity: new FormControl('', { nonNullable: true,
          validators: [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]
        })
      })
    ])
  });
  tableData = new MatTableDataSource<MaterialRow>();
  displayedColumns: (keyof MaterialRow)[] = ['material', 'quantity'];

  get materials(): FormArray<MaterialFormGroup> {
    return this.form.controls.materials;
  }

  addMaterial() {
    this.materials.push(new FormGroup({
      material: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      quantity: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]
      })
    }));
  } 
  removeMaterial(index: number) {
    this.materials.removeAt(index);
  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.tableData.data = this.materials.getRawValue();
    }
  }
  ngOnInit() {
     
  }
 
}
  