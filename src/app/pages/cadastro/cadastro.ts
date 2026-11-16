import { Component, inject } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  private readonly formBuilder = inject(NonNullableFormBuilder);
  readonly form = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    confirmarSenha: ['', Validators.required],
  }, { validators: passwordsMatch });
  statusMessage = '';

  onSubmit(): void {
    this.statusMessage = '';
    this.form.controls.nome.setValue(this.form.controls.nome.value.trim());
    this.form.controls.email.setValue(this.form.controls.email.value.trim().toLowerCase());
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.statusMessage = 'Dados validados. O cadastro ainda precisa ser conectado ao back-end.';
  }
}
