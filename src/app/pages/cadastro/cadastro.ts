import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

const passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('senha')?.value;
  const confirmation = control.get('confirmarSenha')?.value;
  return password && confirmation && password !== confirmation ? { passwordsMismatch: true } : null;
};

const cpfValido: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const cpf = String(control.value ?? '').replace(/\D/g, '');

  if (!cpf) return null;
  if (cpf.length !== 11 || /^([0-9])\1{10}$/.test(cpf)) return { cpfInvalido: true };

  let soma = 0;
  for (let indice = 0; indice < 9; indice++) {
    soma += Number(cpf[indice]) * (10 - indice);
  }
  let digito = (soma * 10) % 11;
  if (digito === 10) digito = 0;
  if (digito !== Number(cpf[9])) return { cpfInvalido: true };

  soma = 0;
  for (let indice = 0; indice < 10; indice++) {
    soma += Number(cpf[indice]) * (11 - indice);
  }
  digito = (soma * 10) % 11;
  if (digito === 10) digito = 0;

  return digito === Number(cpf[10]) ? null : { cpfInvalido: true };
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
    cpf: ['', [
      Validators.required,
      Validators.maxLength(14),
      Validators.pattern(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/),
      cpfValido,
    ]],
    telefone: ['', [Validators.required, Validators.pattern(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/)]],
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
