import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Pesquisa } from './pesquisa';

describe('Pesquisa', () => {
  let component: Pesquisa;
  let fixture: ComponentFixture<Pesquisa>;

  beforeEach(async () => {
    localStorage.removeItem('lojinha.genero');
    await TestBed.configureTestingModule({
      imports: [Pesquisa],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pesquisa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filters the catalog by genre and remembers the selection', () => {
    component.selecionarGenero('Jazz');

    expect(component.produtosFiltrados.length).toBeGreaterThan(0);
    expect(component.produtosFiltrados.every((produto) => produto.categoria === 'Jazz')).toBeTrue();
    expect(localStorage.getItem('lojinha.genero')).toBe('Jazz');
  });
});
