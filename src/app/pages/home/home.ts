import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormField, MatInput, MatLabel, MatError } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgIf } from "../../../../node_modules/@angular/common";

@Component({
  selector: 'app-home',
  imports: [MatFormField, MatInput, MatLabel, MatError, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  forma: FormGroup;
  constructor(
   private fb: FormBuilder

  ) {
    this.forma = fb.group({
      idoi:["", [Validators.required, Validators.maxLength(10)]],
    }
    )
  }

   
 
}
