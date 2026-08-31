import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatLabel } from "@angular/material/input";

@Component({
  selector: 'app-login',
  imports: [MatFormField, MatInput, MatLabel, MatButton, MatError, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
 public form: FormGroup
 public fb:FormBuilder
 constructor( formbuilder:FormBuilder) {
  
  this.fb = formbuilder;
  this.form = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    senha:['',[ Validators.required, Validators.minLength(5)]]
  })
 }
}
