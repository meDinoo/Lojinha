import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { RecuperarSenha } from './pages/recuperar-senha/recuperar-senha';
import { Pesquisa } from './pages/pesquisa/pesquisa';
import { Carrinho } from './pages/carrinho/carrinho';
import { ProdutoDetalhe } from './pages/produto-detalhe/produto-detalhe';
import { FinalizarPedido } from './pages/finalizar-pedido/finalizar-pedido';
import { AreaCliente } from './pages/area-cliente/area-cliente';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'cadastro', component: Cadastro, data: { hideSiteHeader: true } },
    { path: 'senha', component: RecuperarSenha, data: { hideSiteHeader: true } },
    { path: 'pesquisa', component: Pesquisa },
    { path: 'carrinho', component: Carrinho },
    { path: 'finalizar-pedido', component: FinalizarPedido },
    { path: 'conta', component: AreaCliente },
    { path: 'produto/:id', component: ProdutoDetalhe },
    { path: '**', redirectTo: '' },
];
