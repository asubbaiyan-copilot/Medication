import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-template-form',
  styleUrls: ['./template-form.css'] ,
  templateUrl: './template-form.html',
})
export class TemplateForm {
  submitted:boolean = false;
  drugName: string = '';
  drugManufacturer: string = '';

  onSubmit(result: {drugName: string, drugManufacturer: string}) {
    console.log('Form submitted successfully!', result);
    this.drugName = result.drugName.trim().toLowerCase();
    this.drugManufacturer = result.drugManufacturer.toUpperCase();
    this.submitted = true;
  }
}
