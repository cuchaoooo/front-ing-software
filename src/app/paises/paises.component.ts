import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaisService } from '../core/services/pais.service'; //
import { Pais } from '../core/models/pais.model'; //

@Component({
  selector: 'app-paises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {
  private paisService = inject(PaisService);

  paises: Pais[] = [];
  paisSeleccionado: Pais | null = null;
  nuevoNombrePais: string = '';
  editando: boolean = false;

  ngOnInit(): void {
    this.cargarPaises();
  }

  cargarPaises(): void {
    this.paisService.listar().subscribe({ //
      next: (data) => this.paises = data,
      error: (err) => console.error('Error al cargar países:', err)
    });
  }

  seleccionarPais(pais: Pais): void {
    this.paisSeleccionado = { ...pais }; // Clonar para edición
    this.nuevoNombrePais = pais.nombre;
    this.editando = true;
  }

  limpiarSeleccion(): void {
    this.paisSeleccionado = null;
    this.nuevoNombrePais = '';
    this.editando = false;
  }

  guardarPais(): void {
    if (!this.nuevoNombrePais.trim()) {
      alert('El nombre del país no puede estar vacío.');
      return;
    }

    if (this.editando && this.paisSeleccionado) {
      // Modificar país
      const paisActualizado: Pais = { ...this.paisSeleccionado, nombre: this.nuevoNombrePais.trim() };
      this.paisService.modificar(paisActualizado).subscribe({ //
        next: () => {
          this.cargarPaises();
          this.limpiarSeleccion();
        },
        error: (err) => console.error('Error al modificar país:', err)
      });
    } else {
      // Agregar nuevo país
      // El ID debería ser asignado por el backend, así que enviamos un ID temporal o 0
      const nuevoPais: Pais = { id: 0, nombre: this.nuevoNombrePais.trim() }; 
      this.paisService.agregar(nuevoPais).subscribe({ //
        next: () => {
          this.cargarPaises();
          this.limpiarSeleccion();
        },
        error: (err) => console.error('Error al agregar país:', err)
      });
    }
  }

  eliminarPais(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este país?')) {
      this.paisService.eliminar(id).subscribe({ //
        next: (eliminado) => {
          if (eliminado) {
            this.cargarPaises();
            this.limpiarSeleccion();
          } else {
            alert('No se pudo eliminar el país.');
          }
        },
        error: (err) => console.error('Error al eliminar país:', err)
      });
    }
  }
}