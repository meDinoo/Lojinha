import { Component, inject } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginManager } from '../../managers/login-manager';
import { CadastroRequest } from '../../models/autenticacao';

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
  for (let indice = 0; indice < 9; indice++) soma += Number(cpf[indice]) * (10 - indice);
  let digito = (soma * 10) % 11;
  if (digito === 10) digito = 0;
  if (digito !== Number(cpf[9])) return { cpfInvalido: true };
  soma = 0;
  for (let indice = 0; indice < 10; indice++) soma += Number(cpf[indice]) * (11 - indice);
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
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly loginManager = inject(LoginManager);
  readonly form = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required, Validators.maxLength(14), Validators.pattern(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/), cpfValido]],
    telefone: ['', [Validators.required, Validators.pattern(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/)]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    confirmarSenha: ['', Validators.required],
  }, { validators: passwordsMatch });
  statusMessage = '';
  carregando = false;

  onSubmit(): void {
    this.statusMessage = '';
    this.form.controls.nome.setValue(this.form.controls.nome.value.trim());
    this.form.controls.email.setValue(this.form.controls.email.value.trim().toLowerCase());
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();
    const request: CadastroRequest = {
      nome: values.nome,
      email: values.email,
      senha: values.senha,
      cpf: values.cpf.replace(/\D/g, ''),
      telefone: values.telefone.replace(/\D/g, ''),
    };

    this.carregando = true;
    this.loginManager.cadastrar(request).subscribe({
      next: () => {
        this.statusMessage = 'Cadastro realizado. Agora voc\u00ea pode entrar.';
        this.form.reset();
      },
      error: (error) => {
        this.statusMessage = error?.error?.mensagem ?? 'N\u00e3o foi poss\u00edvel realizar o cadastro. Tente novamente.';
        this.carregando = false;
      },
      complete: () => this.carregando = false,
    });
  }
}