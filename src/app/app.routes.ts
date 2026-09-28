import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { RecuperarSenha } from './pages/recuperar-senha/recuperar-senha';
import { Pesquisa } from './pages/pesquisa/pesquisa';
import { Carrinho } from './pages/carrinho/carrinho';
import { ProdutoDetalhe } from './pages/produto-detalhe/produto-detalhe';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'cadastro', component: Cadastro, data: { hideSiteHeader: true } },
    { path: 'senha', component: RecuperarSenha, data: { hideSiteHeader: true } },
    { path: 'pesquisa', component: Pesquisa },
    { path: 'carrinho', component: Carrinho },
    { path: 'produto/:id', component: ProdutoDetalhe },
    { path: '**', redirectTo: '' },
];
