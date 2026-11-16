import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './recuperar-senha.html',
  styleUrl: './recuperar-senha.scss',
})
export class RecuperarSenha {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  readonly form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  submitted = false;

  onSubmit(): void {
    this.submitted = false;
    this.form.controls.email.setValue(this.form.controls.email.value.trim().toLowerCase());
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted = true;
  }

}
