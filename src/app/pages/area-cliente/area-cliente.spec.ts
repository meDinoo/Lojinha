import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LoginManager } from '../../managers/login-manager';
import { AreaCliente } from './area-cliente';
import { PedidoConfirmacaoService } from '../../services/pedido-confirmacao.service';

describe('AreaCliente', () => {
  let component: AreaCliente;
  let fixture: ComponentFixture<AreaCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaCliente],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AreaCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('asks logged-out visitors to sign in', () => {
    expect(fixture.nativeElement.textContent).toContain('Entre para acessar sua conta');
  });

  it('shows the customer dashboard when a user is present', () => {
    TestBed.inject(LoginManager).usuarioAtual.set({
      nome: 'Cliente',
      email: 'cliente@example.com',
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Meus pedidos');
    expect(fixture.nativeElement.textContent).toContain('cliente@example.com');
  });

  it('shows a thank-you message only after a confirmed order is provided', () => {
    TestBed.inject(LoginManager).usuarioAtual.set({
      nome: 'Cliente',
      email: 'cliente@example.com',
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain('Obrigado pela sua compra');

    TestBed.inject(PedidoConfirmacaoService).registrarConfirmacao({
      id: 'PED-123',
      status: 'confirmado',
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Obrigado pela sua compra!');
    expect(fixture.nativeElement.textContent).toContain('#PED-123');
  });
});
