import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show the shared header on store pages', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-site-header')).not.toBeNull();
  });

  it('should hide the shared header on registration and password recovery', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/cadastro');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-site-header')).toBeNull();

    await router.navigateByUrl('/senha');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-site-header')).toBeNull();
  });
});
