import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Alumno, AlumnoPayload } from './models/alumno.model';
import { AlumnosService } from './services/alumnos';

type AlumnoForm = Omit<Alumno, 'id' | 'edad'> & { edad: number | null };
type ModoModal = 'crear' | 'editar' | 'ver';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private changeDetector = inject(ChangeDetectorRef);
  private alumnosService = inject(AlumnosService);

  alumnos: Alumno[] = [];
  alumnoActual: AlumnoForm = this.nuevoFormulario();
  alumnoId?: number;
  modo: ModoModal = 'crear';
  modalAbierto = false;
  cargando = false;
  guardando = false;
  errorCarga = '';
  errorFormulario = '';

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.cargando = true;
    this.errorCarga = '';

    this.alumnosService.obtenerTodos().subscribe({
      next: (alumnos) => {
        this.alumnos = alumnos;
        this.cargando = false;
        this.changeDetector.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Error al cargar alumnos:', error);
        this.errorCarga = 'No se pudo cargar la lista. Verifica que el backend esté ejecutándose.';
        this.cargando = false;
        this.changeDetector.markForCheck();
      }
    });
  }

  nuevoAlumno(): void {
    this.prepararModal('crear', this.nuevoFormulario());
  }

  verAlumno(alumno: Alumno): void {
    this.prepararModal('ver', this.aFormulario(alumno), alumno.id);
  }

  editarAlumno(alumno: Alumno | AlumnoForm): void {
    this.prepararModal('editar', this.aFormulario(alumno), 'id' in alumno ? alumno.id : this.alumnoId);
  }

  guardar(form: NgForm): void {
    if (form.invalid || this.alumnoActual.edad === null) {
      form.control.markAllAsTouched();
      return;
    }

    const alumno: AlumnoPayload = {
      nombre: this.alumnoActual.nombre.trim(),
      apellido: this.alumnoActual.apellido.trim(),
      edad: this.alumnoActual.edad,
      correo: this.alumnoActual.correo.trim()
    };

    this.guardando = true;
    this.errorFormulario = '';

    const solicitud = this.modo === 'editar' && this.alumnoId !== undefined
      ? this.alumnosService.actualizar(this.alumnoId, alumno)
      : this.alumnosService.crear(alumno);

    solicitud.subscribe({
      next: () => {
        this.guardando = false;
        this.cerrarModal();
        this.cargarAlumnos();
        this.changeDetector.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Error al guardar alumno:', error);
        this.errorFormulario = 'No se pudo guardar el alumno. Revisa los datos e inténtalo nuevamente.';
        this.guardando = false;
        this.changeDetector.markForCheck();
      }
    });
  }

  eliminarAlumno(alumno: Alumno): void {
    if (!window.confirm(`¿Eliminar a ${alumno.nombre} ${alumno.apellido}?`)) {
      return;
    }

    this.errorCarga = '';
    this.alumnosService.eliminar(alumno.id).subscribe({
      next: () => {
        this.alumnos = this.alumnos.filter((actual) => actual.id !== alumno.id);
        this.changeDetector.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Error al eliminar alumno:', error);
        this.errorCarga = 'No se pudo eliminar el alumno. Inténtalo nuevamente.';
        this.changeDetector.markForCheck();
      }
    });
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.alumnoId = undefined;
    this.alumnoActual = this.nuevoFormulario();
    this.errorFormulario = '';
  }

  cerrarModalDesdeFondo(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.cerrarModal();
    }
  }

  private prepararModal(modo: ModoModal, alumno: AlumnoForm, id?: number): void {
    this.modo = modo;
    this.alumnoActual = alumno;
    this.alumnoId = id;
    this.errorFormulario = '';
    this.modalAbierto = true;
  }

  private nuevoFormulario(): AlumnoForm {
    return { nombre: '', apellido: '', edad: null, correo: '' };
  }

  private aFormulario(alumno: Alumno | AlumnoForm): AlumnoForm {
    return {
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      edad: alumno.edad,
      correo: alumno.correo
    };
  }
}
