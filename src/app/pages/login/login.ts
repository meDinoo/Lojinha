import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginManager } from '../../managers/login-manager';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly loginManager = inject(LoginManager);
  private readonly router = inject(Router);
  readonly form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
  });
  submitted = false;
  carregando = false;
  statusMessage = '';

  onSubmit(): void {
    this.submitted = true;
    this.statusMessage = '';
    this.form.controls.email.setValue(this.form.controls.email.value.trim().toLowerCase());
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.loginManager.login(this.form.getRawValue()).subscribe({
      next: () => void this.router.navigateByUrl('/conta'),
      error: (error) => {
        this.statusMessage = error?.error?.mensagem ?? 'E-mail ou senha inv\u00e1lidos.';
        this.carregando = false;
      },
      complete: () => this.carregando = false,
    });
  }
}