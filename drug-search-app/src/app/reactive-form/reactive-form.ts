import { Component } from '@angular/core';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-reactive-form',
  styleUrls: ['./reactive-form.css'],
  templateUrl: './reactive-form.html',
})
export class ReactiveForm implements OnInit {
  userName: string = '';
  userEmail: string = '';
  formdata : FormGroup = new FormGroup({});
  submitted: boolean = false;
  ngOnInit() {
    this.formdata = new FormGroup({ 
      userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      userEmail: new FormControl('', [Validators.required, Validators.email,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)])
    });
  }

  shouldShowError(controlName: string): boolean {
    const control = this.formdata.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  onSubmit(data: {userName: string, userEmail: string}) {
    this.userName = data.userName.trim().toUpperCase();
    this.userEmail = data.userEmail.toLowerCase();
    this.submitted = this.formdata.valid;
  }
}
