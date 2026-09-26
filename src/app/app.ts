import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { SiteHeader } from './components/site-header/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly showSiteHeader = signal(true);

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.updateHeaderVisibility();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.updateHeaderVisibility());
  }

  private updateHeaderVisibility(): void {
    let currentRoute: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    // Rotas mostram o cabeçalho por padrão; páginas focadas em autenticação podem ocultá-lo.
    this.showSiteHeader.set(currentRoute.data['hideSiteHeader'] !== true);
  }
}
