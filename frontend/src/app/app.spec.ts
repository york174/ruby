import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('loads and displays alumnos from the API', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    http.expectOne('http://localhost:3000/alumnos').flush([{
      id: 1,
      nombre: 'Ana',
      apellido: 'Perez',
      edad: 15,
      correo: 'ana@example.com'
    }]);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(fixture.componentInstance.alumnos).toHaveLength(1);
    expect(compiled.querySelector('h1')?.textContent).toContain('Lista de Alumnos');
    expect(compiled.querySelector('.table-card')?.textContent).toContain('Ana');
  });

  it('opens the new alumno form', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    http.expectOne('http://localhost:3000/alumnos').flush([]);
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('.page-header button') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input[name="correo"]')).toBeTruthy();
  });
});
