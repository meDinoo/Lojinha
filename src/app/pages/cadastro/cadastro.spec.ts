import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Cadastro } from './cadastro';

describe('Cadastro', () => {
  let component: Cadastro;
  let fixture: ComponentFixture<Cadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cadastro],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('rejects mismatched passwords', () => {
    component.form.setValue({
      nome: 'Cliente',
      email: 'cliente@example.com',
      senha: 'senha1234',
      confirmarSenha: 'outrasenha',
    });

    component.onSubmit();

    expect(component.form.hasError('passwordsMismatch')).toBeTrue();
    expect(component.statusMessage).toBe('');
  });

  it('normalizes the account data and clearly indicates that the API is not connected', () => {
    component.form.setValue({
      nome: '  Cliente  ',
      email: ' Cliente@Example.com ',
      senha: 'senha1234',
      confirmarSenha: 'senha1234',
    });

    component.onSubmit();

    expect(component.form.controls.nome.value).toBe('Cliente');
    expect(component.form.controls.email.value).toBe('cliente@example.com');
    expect(component.statusMessage).toContain('ainda precisa ser conectado');
  });
});
