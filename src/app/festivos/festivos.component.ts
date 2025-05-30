import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FestivoService } from '../core/services/festivo.service'; //
import { PaisService } from '../core/services/pais.service'; //
import { Pais } from '../core/models/pais.model'; //
import { FestivoDto } from '../core/models/festivo-dto.model'; //

@Component({
  selector: 'app-festivos',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './festivos.component.html',
  styleUrls: ['./festivos.component.css']
})
export class FestivosComponent implements OnInit {
  private festivoService = inject(FestivoService);
  private paisService = inject(PaisService);

  paises: Pais[] = [];
  selectedPaisIdVerificar: number | undefined;
  selectedPaisIdListar: number | undefined;
  
  // Para verificación
  fechaVerificar: string = ''; // Formato YYYY-MM-DD
  resultadoVerificacion: string = '';

  // Para listar
  anioListar: number = new Date().getFullYear();
  festivosListados: FestivoDto[] = [];
  columnasFestivos: string[] = ['nombre', 'fecha'];


  ngOnInit(): void {
    this.cargarPaises();
  }

  cargarPaises(): void {
    this.paisService.listar().subscribe({ //
      next: (data) => this.paises = data,
      error: (err) => console.error('Error al cargar países:', err)
    });
  }

  onVerificarFecha(): void {
    if (!this.selectedPaisIdVerificar || !this.fechaVerificar) {
      this.resultadoVerificacion = 'Por favor, selecciona un país y una fecha.';
      return;
    }
    const [anio, mes, dia] = this.fechaVerificar.split('-').map(Number);
    this.festivoService.verificar(this.selectedPaisIdVerificar, anio, mes, dia).subscribe({ //
      next: (esFestivo) => {
        this.resultadoVerificacion = esFestivo ? 'La fecha ES FESTIVA.' : 'La fecha NO ES FESTIVA.';
      },
      error: (err) => {
        this.resultadoVerificacion = 'Error al verificar la fecha.';
        console.error(err);
      }
    });
  }

  onListarFestivos(): void {
    if (!this.selectedPaisIdListar || !this.anioListar) {
      this.festivosListados = [];
      alert('Por favor, selecciona un país y un año.');
      return;
    }
    this.festivoService.listar(this.selectedPaisIdListar, this.anioListar).subscribe({ //
      next: (data) => {
        this.festivosListados = data.map(festivo => ({
          ...festivo,
        }));
      },
      error: (err) => {
        this.festivosListados = [];
        console.error('Error al listar festivos:', err);
        alert('Error al listar festivos.');
      }
    });
  }
}