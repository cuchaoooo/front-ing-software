import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestivoDto } from '../models/festivo-dto.model';

@Injectable({
  providedIn: 'root'
})
export class FestivoService {
  private baseUrl = 'http://localhost:8080/api/festivos'; 

  constructor(private http: HttpClient) { }

  public verificar(idPais: number, anio: number, mes: number, dia: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/verificar/${idPais}/${anio}/${mes}/${dia}`);
  }

  public listar(idPais: number, anio: number): Observable<FestivoDto[]> {
    return this.http.get<FestivoDto[]>(`${this.baseUrl}/listar/${idPais}/${anio}`);
  }
}