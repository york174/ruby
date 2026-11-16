import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AlumnosService } from './alumnos';

describe('AlumnosService', () => {
  let service: AlumnosService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlumnosService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(AlumnosService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('requests the alumnos collection', () => {
    service.obtenerTodos().subscribe((alumnos) => {
      expect(alumnos).toEqual([]);
    });

    const request = http.expectOne('http://localhost:3000/alumnos');
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });
});
