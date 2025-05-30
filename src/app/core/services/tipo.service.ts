import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tipo } from '../models/tipo.model';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  private baseUrl = 'http://localhost:8080/api/tipos'; 

  constructor(private http: HttpClient) { }

  public listar(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${this.baseUrl}/listar`);
  }

  public obtener(id: number): Observable<Tipo> {
    return this.http.get<Tipo>(`${this.baseUrl}/obtener/${id}`);
  }
}