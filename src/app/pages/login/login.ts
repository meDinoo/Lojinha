import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  readonly form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
  });
  submitted = false;
  statusMessage = '';

  onSubmit(): void {
    this.submitted = true;
    this.statusMessage = '';
    this.form.controls.email.setValue(this.form.controls.email.value.trim().toLowerCase());

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.statusMessage = 'Dados validados. A autenticação ainda precisa ser conectada ao back-end.';
  }
}
