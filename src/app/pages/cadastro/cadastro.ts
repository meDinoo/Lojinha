import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

const passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('senha')?.value;
  const confirmation = control.get('confirmarSenha')?.value;
  return password && confirmation && password !== confirmation ? { passwordsMismatch: true } : null;
};

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {
  private readonly formBuilder = inject(FormBuilder);
  readonly form = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    confirmarSenha: ['', Validators.required],
  }, { validators: passwordsMatch });
  successMessage = '';

  onSubmit(): void {
    this.successMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.successMessage = 'Cadastro validado! Em uma próxima etapa, sua conta poderá ser salva na loja.';
  }

}
