import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { CriarPedidoRequest, FormaPagamento } from '../../models/pedido';

@Component({
  selector: 'app-finalizar-pedido',
  imports: [CurrencyPipe, ReactiveFormsModule, RouterLink],
  templateUrl: './finalizar-pedido.html',
  styleUrl: './finalizar-pedido.scss',
})
export class FinalizarPedido {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  readonly carrinho = inject(CarrinhoService);
  readonly frete = 12.9;
  enviado = false;
  pedidoPreparado: CriarPedidoRequest | null = null;

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
    this.enviado = false;
    this.pedidoPreparado = null;
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

    const dados = this.form.getRawValue();
    if (!dados.pagamento) {
      this.form.controls.pagamento.markAsTouched();
      return;
    }

    this.pedidoPreparado = {
      contato: {
        nome: dados.nome.trim(),
        email: dados.email.trim().toLowerCase(),
        telefone: dados.telefone.replace(/\D/g, ''),
      },
      enderecoEntrega: {
        cep: dados.cep.replace(/\D/g, ''),
        endereco: dados.endereco.trim(),
        numero: dados.numero.trim(),
        complemento: dados.complemento.trim(),
        bairro: dados.bairro.trim(),
        cidade: dados.cidade.trim(),
        estado: dados.estado.trim().toUpperCase(),
      },
      formaPagamento: dados.pagamento,
      itens: this.carrinho.itens().map((item) => ({
        produtoId: item.produto.id,
        quantidade: item.quantidade,
      })),
    };

    this.enviado = true;
  }
}
