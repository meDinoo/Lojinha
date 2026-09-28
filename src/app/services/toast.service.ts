import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly mensagem = signal('');
  private timeout?: ReturnType<typeof setTimeout>;

  mostrar(mensagem: string): void {
    this.mensagem.set(mensagem);
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.fechar(), 3000);
  }

  fechar(): void {
    this.mensagem.set('');
  }
}
