import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('normalizes the email and does not claim that authentication succeeded', () => {
    component.form.setValue({ email: '  Cliente@Example.com ', senha: 'senha1234' });

    component.onSubmit();

    expect(component.form.controls.email.value).toBe('cliente@example.com');
    expect(component.statusMessage).toContain('ainda precisa ser conectada');
  });

  it('marks invalid credentials for correction', () => {
    component.form.setValue({ email: 'email-invalido', senha: 'curta' });

    component.onSubmit();

    expect(component.form.invalid).toBeTrue();
    expect(component.form.controls.email.touched).toBeTrue();
    expect(component.form.controls.senha.touched).toBeTrue();
    expect(component.statusMessage).toBe('');
  });
});
