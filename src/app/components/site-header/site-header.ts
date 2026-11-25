import { Component, inject } from '@angular/core';
import { LoginManager } from '../../managers/login-manager';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  readonly conta = inject(LoginManager);
  constructor(private readonly router: Router) {}

  search(query: string, event: Event): void {
    event.preventDefault();
    const term = query.trim();

    if (term) {
      this.router.navigate(['/pesquisa'], { queryParams: { q: term } });
    }
  }

  limparBusca(input: HTMLInputElement): void {
    input.value = '';
  }
}
