import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  constructor(private readonly router: Router) {}

  search(query: string, event: Event): void {
    event.preventDefault();
    const term = query.trim();

    if (term) {
      this.router.navigate(['/pesquisa'], { queryParams: { q: term } });
    }
  }
}