import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { PedidoService } from '../../services/pedido.service';
import { PedidoConfirmacaoService } from '../../services/pedido-confirmacao.service';
import { CriarPedidoRequest, FormaPagamento, PedidoResposta } from '../../models/pedido';

@Component({
  selector: 'app-finalizar-pedido',
  imports: [CurrencyPipe, ReactiveFormsModule, RouterLink],
  templateUrl: './finalizar-pedido.html',
  styleUrl: './finalizar-pedido.scss',
})
export class FinalizarPedido {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly pedidoService = inject(PedidoService);
  private readonly confirmacao = inject(PedidoConfirmacaoService);
  readonly carrinho = inject(CarrinhoService);
  readonly frete = 12.9;
  enviando = false;
  erroMensagem = '';
  pedidoConfirmado: PedidoResposta | null = null;

  readonly form = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required, Validators.pattern(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/)]],
    cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
    endereco: ['', [Validators.required, Validators.maxLength(120)]],
    numero: ['', [Validators.required, Validators.maxLength(20)]],
    complemento: ['', Validators.maxLength(100)],
    bairro: ['', [Validators.required, Validators.maxLength(80)]],
    cidade: ['', [Validators.required, Validators.maxLength(100)]],
    estado: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2}$/)]],
    pagamento: this.formBuilder.control<FormaPagamento | ''>('', Validators.required),
  });

  get total(): number {
    return this.carrinho.total() + this.frete;
  }

  finalizarPedido(): void {
    this.erroMensagem = '';
    this.form.patchValue({
      nome: this.form.controls.nome.value.trim(),
      email: this.form.controls.email.value.trim().toLowerCase(),
      endereco: this.form.controls.endereco.value.trim(),
      numero: this.form.controls.numero.value.trim(),
      complemento: this.form.controls.complemento.value.trim(),
      bairro: this.form.controls.bairro.value.trim(),
      cidade: this.form.controls.cidade.value.trim(),
      estado: this.form.controls.estado.value.trim().toUpperCase(),
    });
    if (this.form.invalid || !this.carrinho.itens().length) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();
    if (!values.pagamento) return;
    const request: CriarPedidoRequest = {
      contato: {
        nome: values.nome.trim(),
        email: values.email.trim().toLowerCase(),
        telefone: values.telefone.replace(/\D/g, ''),
      },
      enderecoEntrega: {
        cep: values.cep.replace(/\D/g, ''),
        endereco: values.endereco.trim(),
        numero: values.numero.trim(),
        complemento: values.complemento.trim(),
        bairro: values.bairro.trim(),
        cidade: values.cidade.trim(),
        estado: values.estado.trim().toUpperCase(),
      },
      formaPagamento: values.pagamento,
      itens: this.carrinho.itens().map(item => ({ produtoId: item.produto.id, quantidade: item.quantidade })),
    };

    this.enviando = true;
    this.pedidoService.criar(request).subscribe({
      next: response => {
        this.pedidoConfirmado = response;
        this.confirmacao.registrarConfirmacao(response);
        this.carrinho.limpar();
      },
      error: error => {
        this.erroMensagem = error?.error?.mensagem ?? 'N\u00e3o foi poss\u00edvel enviar o pedido. Tente novamente.';
        this.enviando = false;
      },
      complete: () => this.enviando = false,
    });
  }
}