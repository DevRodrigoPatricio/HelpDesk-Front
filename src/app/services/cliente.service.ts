import { Cliente } from '../models/cliente';
import { API_CONFIG } from './../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  findById(id:any): Observable<Cliente>{
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }
  
  finAll():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/clientes`)
  }

  create(tecnico : Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/clientes`, tecnico);
  }

  update(tecnico :Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}/clientes/${tecnico.id}`,tecnico);
  }

  delete(id :any):Observable<Cliente>{
    return this.http.delete<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`)
  }
}

