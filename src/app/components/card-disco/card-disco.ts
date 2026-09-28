import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-card-disco',
  imports: [CurrencyPipe],
  templateUrl: './card-disco.html',
  styleUrl: './card-disco.scss',
})
export class CardDisco {
  @Input({ required: true }) produto!: Produto;
  @Output() abrir = new EventEmitter<Produto>();
  @Output() adicionar = new EventEmitter<Produto>();
}
