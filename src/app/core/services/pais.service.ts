import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais.model';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private baseUrl = 'http://localhost:8080/api/paises'; 

  constructor(private http: HttpClient) { }

  public listar(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.baseUrl}/listar`);
  }

  public obtener(id: number): Observable<Pais> {
    return this.http.get<Pais>(`${this.baseUrl}/obtener/${id}`);
  }

  public agregar(pais: Pais): Observable<Pais> {
    return this.http.post<Pais>(`${this.baseUrl}/agregar`, pais);
  }

  public modificar(pais: Pais): Observable<Pais> {
    return this.http.put<Pais>(`${this.baseUrl}/modificar`, pais);
  }

  public eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/eliminar/${id}`);
  }
}
